/** Stand-in for `@shelley/core/logger`: plain console with a namespace. */
type Log = (msg: string, ...data: unknown[]) => void;

export function createLogger(namespace: string): {
  debug: Log;
  info: Log;
  warn: Log;
  error: Log;
} {
  const tag = `[${namespace}]`;
  return {
    debug: (m, ...d) => console.debug(tag, m, ...d),
    info: (m, ...d) => console.info(tag, m, ...d),
    warn: (m, ...d) => console.warn(tag, m, ...d),
    error: (m, ...d) => console.error(tag, m, ...d),
  };
}
