import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, ctx: RouteContext<'/api/vendor/upload-menu-files/[menu_id]'>) {
    const { menu_id } = await ctx.params
    const formData = await req.formData();

    const files = formData.getAll("file") as File[];

    if (!menu_id) {
        return NextResponse.json({ error: "menu_id is required" }, { status: 400 });
    }

    if (!files || files.length === 0) {
        return NextResponse.json({ error: "At least one file is required" }, { status: 400 });
    }

    if (files.length > 5) {
        return NextResponse.json({ error: "Max 5 files allowed" }, { status: 400 });
    }

    const backendFormData = new FormData();

    files.forEach((file) => {
        backendFormData.append("file", file);
    });

    try {
        const response = await fetch(
            `${process.env.BACKEND_API_URL}/cooks/accounts/menu-files/${menu_id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${req.cookies.get("access_token")?.value}`,
                },
                body: backendFormData,
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