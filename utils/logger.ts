import { NextRequest, NextResponse } from 'next/server';

interface LogPayload {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  meta?: any;
}

const LOG_ENDPOINT = process.env.LOG_ENDPOINT || process.env.SENTRY_WEBHOOK_URL;

async function sendToEndpoint(payload: LogPayload) {
  if (!LOG_ENDPOINT) return;
  try {
    await fetch(LOG_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Avoid recursive logging failures
    console.error('Failed to send log', err);
  }
}

function log(level: LogPayload['level'], message: string, meta?: any) {
  if (process.env.NODE_ENV !== 'production') {
    // In dev just log to console
    console[level](message, meta ?? '');
  } else {
    sendToEndpoint({ level, message, meta }).catch(() => {});
  }
}

export const logger = {
  info: (msg: string, meta?: any) => log('info', msg, meta),
  warn: (msg: string, meta?: any) => log('warn', msg, meta),
  error: (msg: string, meta?: any) => log('error', msg, meta),
  debug: (msg: string, meta?: any) => log('debug', msg, meta),
};

export function withRequestLogging(
  handler: (req: NextRequest) => Promise<NextResponse> | NextResponse,
) {
  return async function (req: NextRequest): Promise<NextResponse> {
    logger.info(`Incoming ${req.method} ${req.nextUrl.pathname}`);
    const res = await handler(req);
    logger.info(`Response ${res.status} ${req.nextUrl.pathname}`);
    return res;
  };
}

