export default (incomingConfig) => {
  const shorten = (str) => {
    if (typeof str !== 'string') return 'x'
    const clean = str.replace(/[^a-z0-9]/gi, '').toLowerCase()
    return clean.slice(0, 3) || 'x'
  }
  const walk = (obj) => {
    if (!obj || typeof obj !== 'object') return
    if (typeof obj.slug === 'string' && !obj.dbName) {
      obj.dbName = shorten(obj.slug)
    }
    if (typeof obj.name === 'string' && !obj.dbName) {
      // Only shorten if name looks long or is nested
      obj.dbName = shorten(obj.name)
    }
    Object.keys(obj).forEach(key => {
      const val = obj[key]
      if (Array.isArray(val)) val.forEach(walk)
      else if (val && typeof val === 'object') walk(val)
    })
  }
  if (incomingConfig.collections) incomingConfig.collections.forEach(walk)
  if (incomingConfig.globals) incomingConfig.globals.forEach(walk)
  return incomingConfig
}
