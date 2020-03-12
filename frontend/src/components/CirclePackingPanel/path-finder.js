const findPath = (current, path = []) => {
  if (current === null || current === undefined) {
    return path
  }

  const parent = current.parent
  const label = current.data.data.Label
  path.push({
    label,
    id: current.data.id
  })

  if (parent === undefined || parent === null) {
    return path
  }

  return findPath(parent, path)
}

export { findPath }
