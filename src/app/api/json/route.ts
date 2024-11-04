import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { APP_ROOT } from '@/service/env';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const root = searchParams.get('root') ?? '/db/json/';

  if (!name) {
    return NextResponse.json(
      { error: 'Name parameter is required' },
      { status: 400 }
    );
  }

  try {
    const fullPath = path.join(APP_ROOT, root, `${name}.json`);
    console.log('Loading JSON from:', fullPath);
    const data = await fs.readFile(fullPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error loading JSON:', error);
    return NextResponse.json({ error: 'Failed to load JSON' }, { status: 500 });
  }
}
