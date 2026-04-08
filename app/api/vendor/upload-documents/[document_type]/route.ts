import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, ctx: RouteContext<'/api/vendor/upload-documents/[document_type]'>) {
    const { document_type } = await ctx.params
    const formData = await req.formData();

    const file = formData.get("file");

    if (!document_type) {
        return NextResponse.json({ error: "Document type is required" }, { status: 400 });
    }

    if (!file) {
        return NextResponse.json({ error: "At least one file is required" }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append("file", file);

    try {
        const response = await fetch(
            `${process.env.BACKEND_API_URL}/cooks/accounts/documents?document_type=${document_type}`,
            {
                method: "POST",
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