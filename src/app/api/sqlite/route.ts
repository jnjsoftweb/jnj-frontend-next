import { Sqlite } from './utils';
import { NextResponse } from 'next/server';
const sqlite = new Sqlite();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tableName = searchParams.get('table');
  
  if (!tableName) {
    return NextResponse.json({ error: 'Table parameter is required' }, { status: 400 });
  }

  try {
    const data = await sqlite.find(tableName);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// ... existing code ...
