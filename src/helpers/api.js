import 'isomorphic-fetch'
import cookie from 'js-cookie'
import qs from 'query-string'

const defaultHeaders = {
  'Accept': 'application/json',
  //'Content-Type': 'application/json'
}
const apiUrl = 'http://localhost:8002/api/'

const api = (data) => {
  const token = cookie.get('token')
  const isObj = Object.prototype.toString.call(data) === '[object Object]'
  const options = isObj ? data : {url: data}
  const url = options.durl || apiUrl + options.url
  const params = options.params ? qs.stringify(options.params) : ''
  const headers = {
    ...defaultHeaders,
    ...(token ? {authorization: 'JWT ' + token} : {}),
    ...(options.headers || {})
  }
  return fetch(url + '?' + params, {headers, ...options})
    .then(res => {
      const contentType = res.headers.get('Content-Type')
      const type = contentType.match(/text|json/)[0]
      const response = res[type || 'text']()
      const status = res.status

     return String(res.status).match(/^(5|4)/)
        ? response.then(data => Promise.reject({data, type, status}))
        : response.then(data => Promise.resolve({data, type, status}))
    })
}

export default api
