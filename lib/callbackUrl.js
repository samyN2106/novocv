export function getSafeCallbackUrl(callbackUrl) {
  if (!callbackUrl) {
    return "/";
  }

  // On accepte uniquement les chemins internes
  if (!callbackUrl.startsWith("/")) {
    return "/";
  }

  // On refuse les URLs du type //site-externe.com
  if (callbackUrl.startsWith("//")) {
    return "/";
  }

  return callbackUrl;
}