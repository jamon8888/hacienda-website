export default () => ({
  name: 'shorten-db-names',
  init: async (config) => {
    const shorten = (slug: string) => {
      const clean = slug.replace(/[^a-z0-9]/gi, '').toLowerCase()
      return clean.slice(0, 3) || 'x'
    }
    const walk = (obj: any) => {
      if (!obj || typeof obj !== 'object') return
      if (obj.slug && !obj.dbName) {
        obj.dbName = shorten(obj.slug)
      }
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (Array.isArray(val)) val.forEach(walk)
        else if (val && typeof val === 'object') walk(val)
      })
    }
    const cfg = JSON.parse(JSON.stringify(config))
    if (cfg.collections) cfg.collections.forEach(walk)
    if (cfg.globals) cfg.globals.forEach(walk)
    return cfg
  }
})
