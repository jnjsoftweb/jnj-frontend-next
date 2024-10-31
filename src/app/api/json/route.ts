import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { JSON_ROOT } from '@/service/env';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const root = searchParams.get('root') ?? JSON_ROOT;

  if (!name) {
    return NextResponse.json(
      { error: 'Name parameter is required' },
      { status: 400 }
    );
  }

  try {
    const fullPath = path.resolve(`${root}${name}.json`);
    // const fullPath = path.resolve(`${JSON_ROOT}${name}.json`);
    // console.log(fullPath);
    const data = await fs.readFile(fullPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error loading JSON:', error);
    return NextResponse.json({ error: 'Failed to load JSON' }, { status: 500 });
  }
}
