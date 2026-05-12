import { apiRequest } from './httpClient';

/**
 * Registration call — align with your Django/web route (adjust path if different).
 */
export async function userRegister(payload) {
  const { response, data } = await apiRequest('/api/register', {
    method: 'POST',
    body: payload,
  });

  if (response.ok) {
    return data;
  }
  const message =
    (data &&
      (data.errors?.detail ||
        data.detail ||
        data.message ||
        data.non_field_errors)) ||
    'Registration failed';
  const text =
    typeof message === 'string'
      ? message
      : Array.isArray(message)
        ? message.join(', ')
        : JSON.stringify(message);
  throw new Error(text);
}
