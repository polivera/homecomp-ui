export const logger = {
  debug: (...args: any[]) => import.meta.env.DEV && console.debug(...args),
  info: (...args: any[]) => !import.meta.env.PROD && console.info(...args),
  warn: (...args: any[]) => !import.meta.env.PROD && console.warn(...args),
  error: (...args: any[]) => !import.meta.env.PROD && console.error(...args),
}

