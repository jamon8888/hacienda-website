export default (incomingConfig) => {
  const shorten = (slug) => {
    if (typeof slug !== 'string') return 'x'
    const clean = slug.replace(/[^a-z0-9]/gi, '').toLowerCase()
    return clean.slice(0, 3) || 'x'
  }
  const walk = (obj) => {
    if (!obj || typeof obj !== 'object') return
    if (typeof obj.slug === 'string' && !obj.dbName) {
      obj.dbName = shorten(obj.slug)
    }
    Object.keys(obj).forEach(key => {
      const val = obj[key]
      if (Array.isArray(val)) val.forEach(walk)
      else if (val && typeof val === 'object') walk(val)
    })
  }
  // Deep clone to avoid mutating original before Payload processes it
  const config = JSON.parse(JSON.stringify(incomingConfig))
  if (config.collections) config.collections.forEach(walk)
  if (config.globals) config.globals.forEach(walk)
  return config
}
