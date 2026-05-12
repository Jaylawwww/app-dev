/**
 * Single place for API base URL and JSON helpers (same pattern as a typical web client).
 * Android emulator reaches host machine via 10.0.2.2.
 */
export const getApiBaseUrl = () => 'http://10.0.2.2:8000';

export async function apiRequest(path, { method = 'GET', body, headers = {} } = {}) {
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`;
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (body !== undefined) {
    options.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  const response = await fetch(url, options);
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  return { response, data };
}
