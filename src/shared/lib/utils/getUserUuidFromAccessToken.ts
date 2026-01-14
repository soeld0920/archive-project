export default function getUserUuidFromAccessToken(): string | null {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(
      payloadBase64.replace(/-/g, "+").replace(/_/g, "/")
    );
    const payload = JSON.parse(payloadJson);

    return payload.userUuid ?? payload.sub ?? null;
  } catch (e) {
    console.error("Invalid access token", e);
    return null;
  }
}