export default async function authFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {
  const token = localStorage.getItem("accessToken");

  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}
