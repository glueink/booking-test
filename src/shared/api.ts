export default async function api(input: RequestInfo | URL, init?: RequestInit) {
  // place for configuration
  const response = await fetch(input, init);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong');
}
