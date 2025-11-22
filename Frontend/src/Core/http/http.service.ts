import axios, { AxiosInstance } from 'axios'

const BASE_URL = (import.meta as any).env?.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

function getStoredToken(): string | null {
  try {
    const raw = localStorage.getItem('access_token')
    if (!raw) return null
    const trimmed = raw.trim()
    if (trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed)
        return parsed?.token || parsed?.access_token || parsed?.auth_token || null
      } catch {
        return raw
      }
    }
    return raw
  } catch {
    return null
  }
}

// Attach Authorization header automatically when token is available
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Optional: central response handling (401, logging, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: if unauthorized, we could clear token or redirect to login here
    // if (error?.response?.status === 401) { /* handle token expiry */ }
    return Promise.reject(error)
  }
)

export function setAuthToken(token: string | null) {
  try {
    if (token) localStorage.setItem('access_token', token)
    else {
      localStorage.removeItem('access_token')
      localStorage.removeItem('auth_token')
    }
  } catch {}

  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete api.defaults.headers.common['Authorization']
}

export default api
