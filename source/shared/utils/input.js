const setter = (set) => (e) => {
  const { target } = e
  const { value } = target
  set(value)
}

export { setter }
