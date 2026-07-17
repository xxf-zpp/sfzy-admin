const BASE_URL = 'http://localhost:8081'
const TIMEOUT = 10000

/**
 * 请求拦截器（处理请求配置）
 */
function requestInterceptor(config) {
  // 从 localStorage 读取 token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: token,
    }
    console.log('[request] 已附加 token:', token.substring(0, 30) + '...')
  } else {
    console.warn('[request] 未找到 token，请求可能被拦截')
  }
  // 默认 JSON 请求头
  if (!config.headers?.['Content-Type']) {
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    }
  }
  return config
}

/**
 * 响应拦截器（处理响应数据）
 */
async function responseInterceptor(response) {
  // 登录过期（常见状态码 401）
  if (response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    return Promise.reject(new Error('登录已过期'))
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `请求失败 (${response.status})`)
  }

  const data = await response.json()
  // 如果后端统一返回 { code, data, msg/message } 格式
  if (data.code !== undefined && data.code !== 0 && data.code !== 200) {
    throw new Error(data.msg || data.message || '请求失败')
  }
  return data
}

/**
 * 核心请求方法
 */
async function request(url, options = {}) {
  const config = requestInterceptor({
    url: `${BASE_URL}${url}`,
    method: 'GET',
    ...options,
  })

  // 超时控制
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)
  config.signal = controller.signal

  try {
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.body,
      signal: config.signal,
    })
    return await responseInterceptor(response)
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('请求超时', { cause: error })
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

// 便捷方法
export function get(url, params, options = {}) {
  let queryStr = ''
  if (params) {
    const qs = new URLSearchParams(params).toString()
    if (qs) queryStr = `?${qs}`
  }
  return request(`${url}${queryStr}`, { ...options, method: 'GET' })
}

export function post(url, data, options = {}) {
  return request(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data ?? {}),
  })
}

export function put(url, data, options = {}) {
  return request(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data ?? {}),
  })
}

export function del(url, params, options = {}) {
  let queryStr = ''
  if (params) {
    const qs = new URLSearchParams(params).toString()
    if (qs) queryStr = `?${qs}`
  }
  return request(`${url}${queryStr}`, { ...options, method: 'DELETE' })
}

export default request
