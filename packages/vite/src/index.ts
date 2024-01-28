import type { LoadScriptOptions } from '@conveadjs/core'
import type { HtmlTagDescriptor, Plugin, ResolvedConfig } from 'vite'
import { injectTag } from './inject'

export type VitePluginConveadOptions = LoadScriptOptions

export default function VitePluginConvead({ appKey }: VitePluginConveadOptions): Plugin {
  // eslint-disable-next-line unused-imports/no-unused-vars
  let config: ResolvedConfig

  return {
    name: '@conveadjs/vite',
    configResolved(resolvedConfig: ResolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = []

      tags.push(...injectTag(appKey))
      return tags
    },
  }
}
