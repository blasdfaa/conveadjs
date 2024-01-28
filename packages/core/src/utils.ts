import type { LoadScriptOptions } from './types'

export function isValidEventKey(key: string) {
  return /^[a-zA-Z0-9_]+$/.test(key)
}

export function getScriptTag(appKey: string) {
  const conveadContent = `
      (function(w,d,c){
        w[c]=w[c]||function(){(w[c].q=w[c].q||[]).push(arguments)};
        var ts = (+new Date()/86400000|0)*86400;
        var s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.charset = 'utf-8';
        s.src = 'https://tracker.convead.io/widgets/'+ts+'/widget-${appKey}.js';
        var x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    })(window,document,'convead');
  `
  return conveadContent.trim()
}

/**
 * Check if convead script is in the document.
 *
 * @param source The URL of the script, if it differs from the default. Default: 'https://tracker.convead.io'.
 * @returns `true` if in the `document` is a `script` with `src` containing `'https://tracker.convead.io'` (or `source` if specified), otherwise `false`.
 */
export function hasScript(source = 'https://tracker.convead.io'): boolean {
  return Array.from(document.getElementsByTagName('script')).some(script => script.src.includes(source))
}

export function loadScript(options: LoadScriptOptions) {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined')
      return

    const head = document.head || document.getElementsByTagName('head')[0]
    const script = document.createElement('script')

    script[options?.loadingStrategy ?? 'defer'] = true
    script.innerHTML = getScriptTag(options.appKey)

    const parentElement: HTMLElement = options?.parentElement ?? head

    if (typeof parentElement?.appendChild !== 'function')
      throw new Error('parentElement must be a DOM element')

    parentElement.appendChild(script)

    script.onload = resolve
    script.onerror = reject
  })
}
