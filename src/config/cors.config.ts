import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

type CorsOriginCallback = (err: Error | null, allow: boolean) => void;
type CorsOriginFn = (
  origin: string | undefined,
  callback: CorsOriginCallback,
) => void;

export function createCorsOptions(): CorsOptions {
  const originsFromEnv: string[] = (process.env.FRONTEND_ORIGIN ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const originChecker: CorsOriginFn = (origin, cb) => {
    // allow requests with no origin (ex. Postman, or server-to-server)
    if (!origin) {
      return cb(null, true);
    }

    const isLocalhost = /^https?:\/\/localhost(:\d+)?$/.test(origin);

    const isAllowed = isLocalhost || originsFromEnv.includes(origin);

    if (isAllowed) {
      return cb(null, true);
    } else {
      return cb(new Error('CORS: Origin not allowed by CORS policy'), false);
    }
  };

  const localhostOnlyChecker: CorsOriginFn = (origin, cb) => {
    if (!origin) return cb(null, true);
    const ok = /^https?:\/\/localhost(:\d+)?$/.test(origin);
    return ok
      ? cb(null, true)
      : cb(new Error('CORS: Origin not allowed'), false);
  };

  return {
    origin: originsFromEnv.length > 0 ? originChecker : localhostOnlyChecker,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: (process.env.CORS_CREDENTIALS ?? 'false') === 'true',
  };
}
