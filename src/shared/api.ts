export default async function api(input: RequestInfo | URL, init?: RequestInit) {
  // place for configuration
  const response = await fetch(input, init);
  return await response.json();
}
