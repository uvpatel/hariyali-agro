import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(req: NextRequest) {
    const categories = await db.select().from(categories);
    return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {

}

export async function PUT(req: NextRequest) {
    
}


export async function DELETE(req: NextRequest) {
}


export async function PATCH(req: NextRequest) {

}