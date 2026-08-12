import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { expenses } from '@/db/schema/expenses/expenses';

export async function GET(req: NextRequest) {
        const expenses_response = await db.select().from(expenses);
        return NextResponse.json(expenses_response);
}

export async function POST(req: NextRequest) {

}

export async function PUT(req: NextRequest) {
    
}


export async function DELETE(req: NextRequest) {
}


export async function PATCH(req: NextRequest) {

}