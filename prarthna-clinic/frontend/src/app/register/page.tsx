'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { authAPI } from '@/lib/api'

const baseSchema = z.object({
  name:     z.string().min(2, 'Enter your full name'),
  email:    z.string().email('Enter a valid email'),
  phone:    z.string().min(10, 'Enter a valid phone number'),
  password: z.string().min(6, 'Minimum 6 characters'),
  confirm:  z.string(),
  role:     z.enum(['patient', 'doctor']),
  // Doctor fields (optional for patients)
  specialization: z.string().optional(),
  qualification:  z.string().optional(),
  hospital:       z.string().optional(),
  experience:     z.string().optional(),
  bio:            z.string().optional(),
}).refine((d) => d.password === d.confirm, {
  message: 'Passwords do not match',
  path: ['confirm'],
})

type FormData = z.infer<typeof baseSchema>

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<'patient' | 'doctor'>('patient')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: { role: 'patient' },
  })

  const watchedRole = watch('role')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const payload: Record<string, unknown> = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      }

      if (data.role === 'doctor') {
        payload.specialization = data.specialization
        payload.qualification  = data.qualification
        payload.hospital       = data.hospital
        payload.experience     = data.experience ? parseInt(data.experience) : undefined
        payload.bio            = data.bio
      }

      await authAPI.register(payload)
      toast.success(
        data.role === 'doctor'
          ? 'Registration successful! Awaiting admin approval.'
          : 'Account created! Please login.'
      )
      window.location.href = '/login'
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Registration failed.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-blue-900 mb-2">Create Account</h1>
          <p className="text-slate-400 text-sm">Join Prarthna Clinic</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm">
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(['patient', 'doctor'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => { setValue('role', r); setRole(r) }}
                className={`py-3 rounded-xl text-sm font-medium transition-colors capitalize ${
                  watchedRole === r
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r === 'patient' ? '🧑 Patient' : '👨‍⚕️ Doctor'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Common fields */}
            <div>
              <label className="label">Full Name</label>
              <input {...register('name')} placeholder="Dr. Rahul Sharma" className="input-field" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label">Email Address</label>
              <input {...register('email')} type="email" placeholder="you@example.com" className="input-field" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input {...register('phone')} type="tel" placeholder="+91 98765 00000" className="input-field" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* Doctor-specific fields */}
            {watchedRole === 'doctor' && (
              <>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-400 mb-3">Professional details (can be updated later)</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Specialization</label>
                    <input {...register('specialization')} placeholder="General Physician" className="input-field" />
                  </div>
                  <div>
                    <label className="label">Qualification</label>
                    <input {...register('qualification')} placeholder="MBBS, MD" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="label">Hospital / Clinic</label>
                  <input {...register('hospital')} placeholder="Sun Rise Hospital, Faridabad" className="input-field" />
                </div>
                <div>
                  <label className="label">Years of Experience</label>
                  <input {...register('experience')} type="number" placeholder="10" className="input-field" />
                </div>
                <div>
                  <label className="label">Short Bio</label>
                  <textarea {...register('bio')} rows={3} placeholder="Brief description of your expertise..." className="input-field resize-none" />
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Password</label>
                <input {...register('password')} type="password" placeholder="••••••••" className="input-field" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="label">Confirm Password</label>
                <input {...register('confirm')} type="password" placeholder="••••••••" className="input-field" />
                {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm.message}</p>}
              </div>
            </div>

            {watchedRole === 'doctor' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
                ⚠️ Doctor accounts require admin approval before appearing on the website. You will be notified once approved.
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}