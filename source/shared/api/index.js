import fetch from 'isomorphic-unfetch'

const fetchApi = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export { fetchApi }
