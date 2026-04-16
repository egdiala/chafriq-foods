import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, ctx: RouteContext<'/api/customer/dispute-order/[order_id]'>) {
    const { order_id } = await ctx.params
    const formData = await req.formData();

    const files = formData.getAll("file") as File[];

    if (!order_id) {
        return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    if (!files || files.length === 0) {
        return NextResponse.json({ error: "At least one file is required" }, { status: 400 });
    }

    if (files.length > 4) {
        return NextResponse.json({ error: "Max 4 files allowed" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `${process.env.BACKEND_API_URL}/customers/accounts/order-lists`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${req.cookies.get("access_token")?.value}`,
                },
                body: formData,
            }
        );
        
        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
        });
    } catch (error) {
        return NextResponse.json(error);
    }
}