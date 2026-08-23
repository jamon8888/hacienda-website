import type { Config } from 'payload'

export const shortenDbNames = (): Config['plugins'] => {
  return [{
    name: 'shorten-db-names',
    init: (config) => {
      const shorten = (slug: string) => {
        const clean = slug.replace(/[^a-z0-9]/gi, '').toLowerCase()
        return clean.slice(0, 3) || 'x'
      }
      const ensureDbName = (obj: any) => {
        if (!obj) return
        if (obj.slug && !obj.dbName) {
          obj.dbName = shorten(obj.slug)
        }
        if (obj.fields) {
          obj.fields.forEach((f: any) => ensureDbName(f))
        }
        if (obj.blocks) {
          obj.blocks.forEach((b: any) => ensureDbName(b))
        }
      }
      if (config.collections) {
        config.collections.forEach((c: any) => ensureDbName(c))
      }
      if (config.globals) {
        config.globals.forEach((g: any) => ensureDbName(g))
      }
    }
  }]
}
