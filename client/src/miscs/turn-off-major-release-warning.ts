/**
 * Disables the console error message for major releases.
 */
export function turnOffMajorRelaseWarning() {
  // eslint-disable-next-line no-console
  const originalConsoleError = console.error;

  // eslint-disable-next-line no-console
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && /major release/.test(args[0])) {
      return;
    }

    originalConsoleError(...args);
  };
}
