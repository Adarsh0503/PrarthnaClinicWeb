import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach token on every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api

// ==================== Auth ====================
export const authAPI = {
  login:    (data: { email: string; password: string }) => api.post('/api/auth/login', data),
  register: (data: object) => api.post('/api/auth/register', data),
  me:       () => api.get('/api/auth/me'),
}

// ==================== Doctors ====================
export const doctorAPI = {
  getAll:    (params?: { specialization?: string; search?: string; page?: number }) =>
               api.get('/api/doctors', { params }),
  getById:   (id: number) => api.get(`/api/doctors/${id}`),
  getSlots:  (id: number, date: string) => api.get(`/api/doctors/${id}/slots`, { params: { date } }),
  update:    (id: number, data: FormData) =>
               api.put(`/api/doctors/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
}

// ==================== Bookings ====================
export const bookingAPI = {
  create:          (data: object) => api.post('/api/bookings', data),
  getMyBookings:   () => api.get('/api/bookings/my'),
  getById:         (id: number) => api.get(`/api/bookings/${id}`),
  cancel:          (id: number) => api.patch(`/api/bookings/${id}/cancel`),
  getDoctorBookings: () => api.get('/api/bookings/doctor'),
  approve:         (id: number) => api.patch(`/api/bookings/${id}/approve`),
}

// ==================== Reviews ====================
export const reviewAPI = {
  create:   (doctorId: number, data: { rating: number; reviewText: string }) =>
              api.post(`/api/doctors/${doctorId}/reviews`, data),
  getAll:   (doctorId: number) => api.get(`/api/doctors/${doctorId}/reviews`),
  delete:   (reviewId: number) => api.delete(`/api/reviews/${reviewId}`),
}

// ==================== Users ====================
export const userAPI = {
  getProfile: () => api.get('/api/users/profile'),
  update:     (data: FormData) =>
                api.put('/api/users/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAll:     () => api.get('/api/admin/users'),
}
