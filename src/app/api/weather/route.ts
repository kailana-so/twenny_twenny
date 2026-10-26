import { NextResponse } from 'next/server';

const PLACE = '-33.71513, 150.3127';

export const dynamic = 'force-dynamic';

export async function GET() {
  const host = process.env.X_API_HOST;
  const key = process.env.X_API_KEY;
  if (!host || !key) {
    return NextResponse.json({ error: 'Weather API not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`https://${host}/current.json?q=${encodeURIComponent(PLACE)}`, {
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': host,
      },
      next: { revalidate: 600 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: `Weather API returned ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({
      current: {
        feelslike_c: data.current.feelslike_c,
        condition: { text: data.current.condition.text },
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Weather API request failed' }, { status: 502 });
  }
}
