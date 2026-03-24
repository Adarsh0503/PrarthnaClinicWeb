// ==================== Doctor ====================
export interface Doctor {
  id: number
  name: string
  email: string
  specialization: string
  qualification: string
  bio: string
  about: string
  experience: number
  ticketPrice: number
  photo: string | null
  hospital: string
  averageRating: number
  totalRating: number
  totalPatients: number
  isApproved: 'pending' | 'approved' | 'cancelled'
  timeSlots: TimeSlot[]
  reviews: Review[]
}

// ==================== TimeSlot ====================
export interface TimeSlot {
  id: number
  day: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

// ==================== Booking ====================
export interface Booking {
  id: number
  doctor: Doctor
  user: User
  appointmentDate: string
  timeSlot: string
  ticketPrice: number
  status: 'pending' | 'approved' | 'cancelled'
  isPaid: boolean
  reason: string
  createdAt: string
}

// ==================== Review ====================
export interface Review {
  id: number
  rating: number
  reviewText: string
  user: { name: string; photo: string | null }
  createdAt: string
}

// ==================== User ====================
export interface User {
  id: number
  name: string
  email: string
  phone: string
  photo: string | null
  role: 'patient' | 'doctor' | 'admin'
  gender: string
  bloodType: string
  appointments: Booking[]
}

// ==================== Auth ====================
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone: string
  role: 'patient' | 'doctor'
}

export interface AuthResponse {
  token: string
  role: string
  message: string
}

// ==================== Appointment Form ====================
export interface BookingRequest {
  doctorId: number
  appointmentDate: string
  timeSlot: string
  reason: string
}

// ==================== API Response ====================
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PagedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  page: number
  size: number
}
