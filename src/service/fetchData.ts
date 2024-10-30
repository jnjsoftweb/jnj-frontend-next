import fs from 'fs/promises';
import path from 'path';

const JSON_ROOT = 'C:/JnJ-soft/Projects/internal/jnj-backend/db/json/youtube/';
const GRAPHQL_URL = 'http://localhost:3007';

const _fetchJson = async (filePath: string) => {
    try {
        const fullPath = path.resolve(filePath);
        const data = await fs.readFile(fullPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

const fetchJson = async (name: string) => {
    return _fetchJson(`${JSON_ROOT}${name}.json`);
}

const fetchGraphql = async (url: string=GRAPHQL_URL, query: string, variables: any={}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL 요청 실패: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL 에러: ${data.errors[0].message}`);
    }

    return data.data;
  } catch (error) {
    console.error('GraphQL 요청 중 에러 발생:', error);
    throw error;
  }
}

export { fetchJson, fetchGraphql };