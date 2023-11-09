import { NextMiddlewareResult } from 'next/dist/server/web/types'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

export function chain(
  functions: MiddlewareFactory[],
  index = 0
): NextMiddleware {
  const current = functions[index]

  if (current) {
    const next = chain(functions, index + 1)
    return current(next)
  }

  return ()=> NextResponse.next();
}