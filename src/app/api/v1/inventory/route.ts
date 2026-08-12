import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

import {  products } from '@/db/schema/inventory/products';

export async function GET(req: NextRequest) {
         const inventory_response = await db.select().from(products);
                return NextResponse.json(inventory_response);
        
}

export async function POST(req: NextRequest) {

}

export async function PUT(req: NextRequest) {
    
}


export async function DELETE(req: NextRequest) {
}


export async function PATCH(req: NextRequest) {

}