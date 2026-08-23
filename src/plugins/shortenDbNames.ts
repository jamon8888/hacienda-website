export default (incomingConfig) => {
  const shorten = (slug) => {
    const clean = slug.replace(/[^a-z0-9]/gi, '').toLowerCase()
    return clean.slice(0, 3) || 'x'
  }
  const walk = (obj) => {
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
  const config = JSON.parse(JSON.stringify(incomingConfig))
  if (config.collections) config.collections.forEach(walk)
  if (config.globals) config.globals.forEach(walk)
  return config
}
