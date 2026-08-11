import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema/user.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Verify that the webhook actually came from Clerk
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    // ==========================================
    // USER CREATED
    // ==========================================

    if (eventType === "user.created") {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        primary_email_address_id,
        phone_numbers,
        primary_phone_number_id,
      } = evt.data;

      const email =
        email_addresses.find(
          (email) => email.id === primary_email_address_id
        )?.email_address ?? email_addresses[0]?.email_address;

      const phone =
        phone_numbers.find(
          (phone) => phone.id === primary_phone_number_id
        )?.phone_number ??
        phone_numbers[0]?.phone_number ??
        null;

      if (!email) {
        return Response.json(
          {
            success: false,
            message: "User email not found",
          },
          {
            status: 400,
          }
        );
      }

      await db
        .insert(users)
        .values({
          clerkId: id,
          email,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
          phone,
          role: "user",
        })
        .onConflictDoNothing({
          target: users.clerkId,
        });

      console.log("User created:", id);
    }

    // ==========================================
    // USER UPDATED
    // ==========================================

    if (eventType === "user.updated") {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        primary_email_address_id,
        phone_numbers,
        primary_phone_number_id,
      } = evt.data;

      const email =
        email_addresses.find(
          (email) => email.id === primary_email_address_id
        )?.email_address ?? email_addresses[0]?.email_address;

      const phone =
        phone_numbers.find(
          (phone) => phone.id === primary_phone_number_id
        )?.phone_number ??
        phone_numbers[0]?.phone_number ??
        null;

      if (!email) {
        return Response.json(
          {
            success: false,
            message: "User email not found",
          },
          {
            status: 400,
          }
        );
      }

      await db
        .update(users)
        .set({
          email,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
          phone,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, id));

      console.log("User updated:", id);
    }

    // ==========================================
    // USER DELETED
    // ==========================================

    if (eventType === "user.deleted") {
      const { id } = evt.data;

      if (id) {
        await db
          .delete(users)
          .where(eq(users.clerkId, id));

        console.log("User deleted:", id);
      }
    }

    return Response.json(
      {
        success: true,
        message: "Webhook processed successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Clerk webhook error:", error);

    return Response.json(
      {
        success: false,
        message: "Webhook processing failed",
      },
      {
        status: 400,
      }
    );
  }
}