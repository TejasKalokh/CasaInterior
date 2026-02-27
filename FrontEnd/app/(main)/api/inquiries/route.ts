import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * POST /api/inquiries
 * Proxies inquiry submissions to the backend to avoid CORS issues.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const res = await fetch(`${BACKEND}/inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data, { status: 201 });
    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to submit inquiry' },
            { status: 500 }
        );
    }
}
