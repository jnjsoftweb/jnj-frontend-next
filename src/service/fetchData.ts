import { APP_URL, GRAPHQL_URL, JSON_ROOT } from './env';

interface GraphQLParams {
  url?: string;
  query: string;
  variables?: Record<string, unknown>;
}

const fetchGraphql = async ({
  url = GRAPHQL_URL,
  query,
  variables = {},
}: GraphQLParams) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
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
};

interface FetchJsonOptions {
  root?: string;
}

const fetchJson = async (
  name: string,
  { root = JSON_ROOT }: FetchJsonOptions = {}
) => {
  try {
    const baseUrl =
      typeof window !== 'undefined' ? window.location.origin : APP_URL;

    const url = new URL(`/api/json`, baseUrl);
    url.searchParams.set('name', name);
    url.searchParams.set('root', root);

    console.log(`url.toString() : ${url.toString()}`);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch JSON');
    }
    return response.json();
  } catch (error) {
    console.error('Error loading JSON:', error);
    return null;
  }
};

export { fetchGraphql, fetchJson };
