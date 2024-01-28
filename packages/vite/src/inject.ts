import { getScriptTag } from '@conveadjs/core'
import type { HtmlTagDescriptor } from 'vite'

export function injectTag(appKey: string) {
  const tags: HtmlTagDescriptor[] = []

  tags.push({
    tag: 'script',
    children: ``,
    injectTo: 'body',
  })

  tags.push({
    tag: 'script',
    children: getScriptTag(appKey),
    injectTo: 'body',
  })

  return tags
}
