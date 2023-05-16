export function isAndroid(): boolean {
  return (
    // Source: https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
    typeof navigator !== 'undefined' &&
    /Android\s([0-9.]+)/.test(navigator.userAgent)
  );
}

export function isIOS(): boolean {
  return (
    // Source: https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
    typeof navigator !== 'undefined' &&
    /Version\/([0-9._]+).*Mobile.*Safari.*/.test(navigator.userAgent)
  );
}

export function isMobile(): boolean {
  return isAndroid() || isIOS();
}
