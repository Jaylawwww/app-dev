/**
 * Normalizes login API JSON into a single Redux-friendly session object.
 * All persistence goes through redux-persist on the auth slice — screens never touch AsyncStorage.
 */
export function sessionFromLoginApiResponse(json) {
  if (!json || typeof json !== 'object') {
    return null;
  }
  const token =
    json.access ??
    json.token ??
    json.access_token ??
    json.key ??
    null;
  const user =
    json.user ??
    json.profile ??
    (json.username ? { username: json.username } : null);

  return {
    token,
    user,
    receivedAt: Date.now(),
    raw: json,
  };
}
