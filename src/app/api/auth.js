import { apiRequest } from './httpClient';

export async function userLogin({ username, password }) {
  const { response, data } = await apiRequest('/api/login', {
    method: 'POST',
    body: { username, password },
  });

  if (response.ok) {
    return data;
  }
  const message =
    (data &&
      (data.errors?.password ||
        data.errors?.detail ||
        data.detail ||
        data.message)) ||
    'Login failed';
  throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
}
