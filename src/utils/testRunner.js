export const DEFAULT_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}`
  : 'https://jsonplaceholder.typicode.com/todos/1';

export function makeCase(number, from = null) {
  const base = {
    id: crypto.randomUUID(),
    name: `Case ${number}`,
    output: null,
    status: 'idle',
    duration: null,
  };

  if (from) {
    return {
      ...from,
      ...base,
    };
  }

  return {
    ...base,
    url: DEFAULT_URL,
    method: 'GET',
    bodyText: '',
    headers: '',
    expected: `{\n  "userId": 1,\n  "id": 1,\n  "title": "delectus aut autem",\n  "completed": false\n}`,
  };
}

export function sortedStringify(val) {
  if (val === null || typeof val !== 'object') return JSON.stringify(val);
  if (Array.isArray(val)) return '[' + val.map(sortedStringify).join(',') + ']';
  const keys = Object.keys(val).sort();
  return '{' + keys.map(k => JSON.stringify(k) + ':' + sortedStringify(val[k])).join(',') + '}';
}

export function jsonEqual(a, b) {
  try {
    return sortedStringify(JSON.parse(a.trim())) === sortedStringify(JSON.parse(b.trim()));
  } catch {
    return a.trim() === b.trim();
  }
}

export async function executeCase(tc) {
  const start = Date.now();
  try {
    const bodyText = tc.bodyText.trim();
    const bodyObj = bodyText ? JSON.parse('{' + bodyText + '}') : {};

    const headerText = tc.headers.trim();
    let extraHeaders = {};
    try {
      extraHeaders = headerText ? JSON.parse('{' + headerText + '}') : {};
    } catch {
      extraHeaders = {};
    }

    const method = tc.method.trim().toUpperCase();

    const res = await fetch(tc.url, {
      method,
      headers: { 'Content-Type': 'application/json', ...extraHeaders },
      body: ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(bodyObj),
    });

    const data = await res.json();
    const output = JSON.stringify(data, null, 2);
    const duration = Date.now() - start;
    const passed = jsonEqual(output, tc.expected);

    return { status: passed ? 'pass' : 'fail', output, duration };
  } catch (err) {
    return { status: 'error', output: `Error: ${err.message}`, duration: Date.now() - start };
  }
}
