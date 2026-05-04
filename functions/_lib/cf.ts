export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<unknown[]>;
}

export interface FunctionContext<E, P extends Record<string, string> = Record<string, string>> {
  request: Request;
  env: E;
  params: P;
}

export type FunctionHandler<E, P extends Record<string, string> = Record<string, string>> = (
  context: FunctionContext<E, P>
) => Promise<Response> | Response;
