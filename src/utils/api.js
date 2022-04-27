import axios from 'axios'

export const API_URL = 'https://api.github.com'

export function getData(url) {
  return axios({
    url,
    method: 'GET'
  })
}
