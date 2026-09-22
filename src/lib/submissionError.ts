export class SubmissionError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly retryAfter?: number,
  ) {
    super(message);
  }
}

export function submissionErrorResponse(error: unknown): Response | undefined {
  if (!(error instanceof SubmissionError)) return;
  return Response.json({ error: error.message }, {
    status: error.status,
    headers: {
      'Cache-Control': 'no-store',
      ...(error.retryAfter ? { 'Retry-After': String(error.retryAfter) } : {}),
    },
  });
}
