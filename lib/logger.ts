// Minimal app logger wrapper; prefer logger.info over console.log
export const logger = {
  info: (...args: unknown[]) => {
    // tag output so it’s identifiable in container logs
    // eslint-disable-next-line no-console
    console.info("[app]", ...args);
  },
  warn: (...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.warn("[app]", ...args);
  },
  error: (...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.error("[app]", ...args);
  },
};

// codex-ok: 2026-04-10T10:25:00+08:00