import { NextResponse } from 'next/server';

const SHEETDB_URL = process.env.SHEETDB_URL;

export async function POST(request: Request) {
    if (!SHEETDB_URL) {
        return NextResponse.json(
            { error: 'Contact form is not configured' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const response = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Subject: subject,
                Message: message,
            }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to submit message' },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
