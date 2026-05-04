export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

export function error(message: string, status = 500) {
  return json({ error: message }, { status });
}
