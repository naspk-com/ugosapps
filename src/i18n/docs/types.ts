export type LocaleCode = 'zh-CN' | 'en-US'

export type DocId = 'privacy' | 'terms' | 'third-party' | 'support'

export const docIds: DocId[] = ['privacy', 'terms', 'third-party', 'support']

export type Block =
  | { kind: 'text'; html: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'notice'; html: string }
  | { kind: 'table'; head: string[]; rows: string[][] }

export interface DocSection {
  id?: string
  title: string
  blocks: Block[]
}

export interface DocPage {
  eyebrow: string
  title: string
  lead: string
  meta: string
  sections: DocSection[]
}

export interface DocSet {
  privacy: (app: import('./apps').AppInfo) => DocPage
  terms: (app: import('./apps').AppInfo) => DocPage
  'third-party': (app: import('./apps').AppInfo) => DocPage
  support: (app: import('./apps').AppInfo) => DocPage
}
