"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const product = {
  name: "Premium Hybrid Tomato Seeds",
  category: "Vegetable Seeds",
  brand: "AgroGrow",
  rating: 4.8,
  reviews: 126,
  description:
    "High-quality hybrid tomato seeds developed for strong plant growth, uniform fruits and reliable yield.",

  images: [
    "/products/tomato-seeds-1.png",
    "/products/tomato-seeds-2.png",
    "/products/tomato-seeds-3.png",
  ],

  variants: [
    {
      id: 1,
      size: "10g",
      price: 249,
      originalPrice: 299,
    },
    {
      id: 2,
      size: "25g",
      price: 499,
      originalPrice: 599,
    },
    {
      id: 3,
      size: "50g",
      price: 899,
      originalPrice: 1099,
    },
  ],

  specifications: [
    ["Crop", "Tomato"],
    ["Seed Type", "Hybrid"],
    ["Germination", "85%+"],
    ["Sowing Season", "Kharif / Rabi"],
    ["Harvest", "70–80 Days"],
    ["Country", "India"],
  ],
}

export default function AgroProductPage() {
  const [image, setImage] = useState(product.images[0])
  const [variant, setVariant] = useState(product.variants[1])
  const [quantity, setQuantity] = useState(1)

  const discount = Math.round(
    ((variant.originalPrice - variant.price) /
      variant.originalPrice) *
      100
  )

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-12">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground">
          Home / Seeds / Vegetable Seeds / {product.name}
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ================= PRODUCT IMAGES ================= */}

          <section>
            <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted">
              <Image
                src={image}
                alt={product.name}
                fill
                priority
                className="object-contain p-8"
              />

              <Badge className="absolute left-4 top-4">
                {discount}% OFF
              </Badge>

              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-4 rounded-full"
              >
                <Heart className="size-4" />
              </Button>
            </div>

            {/* thumbnails */}

            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((item) => (
                <button
                  key={item}
                  onClick={() => setImage(item)}
                  className={`relative aspect-square overflow-hidden rounded-xl border ${
                    image === item
                      ? "border-primary"
                      : "border-border"
                  }`}
                >
                  <Image
                    src={item}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* ================= PRODUCT INFO ================= */}

          <section>
            <Badge variant="secondary">
              {product.category}
            </Badge>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              By {product.brand}
            </p>

            {/* Rating */}

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-current" />
                <span className="font-medium">
                  {product.rating}
                </span>
              </div>

              <span className="text-sm text-muted-foreground">
                ({product.reviews} verified reviews)
              </span>
            </div>

            {/* Price */}

            <div className="mt-6 flex items-end gap-3">
              <span className="text-3xl font-semibold">
                ₹{variant.price}
              </span>

              <span className="text-lg text-muted-foreground line-through">
                ₹{variant.originalPrice}
              </span>

              <span className="text-sm font-medium text-green-600">
                {discount}% OFF
              </span>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Inclusive of all taxes
            </p>

            <p className="mt-6 leading-7 text-muted-foreground">
              {product.description}
            </p>

            <Separator className="my-6" />

            {/* ================= PACK SIZE ================= */}

            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="font-medium">
                  Select Pack Size
                </p>

                <span className="text-sm text-muted-foreground">
                  Available in 3 sizes
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setVariant(item)}
                    className={`rounded-xl border p-4 text-left transition ${
                      variant.id === item.id
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium">
                      {item.size}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      ₹{item.price}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock */}

            <div className="mt-6 flex items-center gap-2 text-sm">
              <Check className="size-4 text-green-600" />

              <span className="font-medium text-green-600">
                In Stock
              </span>

              <span className="text-muted-foreground">
                • Ready to dispatch
              </span>
            </div>

            {/* Quantity */}

            <div className="mt-6">
              <p className="mb-3 font-medium">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-lg border">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={quantity === 1}
                  onClick={() =>
                    setQuantity((value) =>
                      Math.max(1, value - 1)
                    )
                  }
                >
                  <Minus className="size-4" />
                </Button>

                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setQuantity((value) => value + 1)
                  }
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            {/* ================= CTA ================= */}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                size="lg"
                className="h-12"
              >
                <ShoppingCart className="mr-2 size-4" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                className="h-12"
              >
                Buy Now
              </Button>
            </div>

            {/* ================= BENEFITS ================= */}

            <div className="mt-6 grid gap-4 rounded-xl border p-5 sm:grid-cols-3">

              <div>
                <Truck className="mb-2 size-5" />
                <p className="text-sm font-medium">
                  Fast Delivery
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Across India
                </p>
              </div>

              <div>
                <ShieldCheck className="mb-2 size-5" />
                <p className="text-sm font-medium">
                  Quality Assured
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Verified products
                </p>
              </div>

              <div>
                <Check className="mb-2 size-5" />
                <p className="text-sm font-medium">
                  Genuine Product
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Trusted brands
                </p>
              </div>
            </div>

          </section>
        </div>

        {/* ================= DETAILS ================= */}

        <section className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr]">

          <div>
            <h2 className="text-2xl font-semibold">
              Product Information
            </h2>

            <Accordion
              type="single"
              collapsible
              defaultValue="description"
              className="mt-5"
            >
              <AccordionItem value="description">
                <AccordionTrigger>
                  Description
                </AccordionTrigger>

                <AccordionContent className="leading-7 text-muted-foreground">
                  Premium hybrid tomato seeds suitable for commercial
                  and household cultivation. Designed for strong
                  germination, healthy plant development and consistent
                  fruit production.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage">
                <AccordionTrigger>
                  How to Use
                </AccordionTrigger>

                <AccordionContent className="space-y-2 text-muted-foreground">
                  <p>1. Prepare a well-drained nursery bed.</p>
                  <p>2. Sow seeds approximately 0.5–1 cm deep.</p>
                  <p>3. Maintain adequate moisture.</p>
                  <p>4. Transplant healthy seedlings after establishment.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger>
                  Shipping Information
                </AccordionTrigger>

                <AccordionContent className="text-muted-foreground">
                  Orders are generally dispatched within 1–2 business
                  days. Delivery times depend on the shipping location.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Specifications */}

          <div>
            <h2 className="text-2xl font-semibold">
              Specifications
            </h2>

            <div className="mt-5 overflow-hidden rounded-xl border">
              {product.specifications.map(
                ([label, value], index) => (
                  <div
                    key={label}
                    className={`grid grid-cols-2 gap-4 p-4 text-sm ${
                      index !== product.specifications.length - 1
                        ? "border-b"
                        : ""
                    }`}
                  >
                    <span className="text-muted-foreground">
                      {label}
                    </span>

                    <span className="font-medium">
                      {value}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}