'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { authAPI } from '@/lib/api'

const schema = z.object({
  name:     z.string().min(2, 'Enter your full name'),
  email:    z.string().email('Enter a valid email'),
  phone:    z.string().min(10, 'Enter a valid phone number'),
  password: z.string().min(6, 'Minimum 6 characters'),
  confirm:  z.string(),
  role:     z.enum(['patient', 'doctor']),
}).refine((d) => d.password === d.confirm, {
  message: 'Passwords do not match',
  path: ['confirm'],
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'patient' },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await authAPI.register({ name: data.name, email: data.email, phone: data.phone, password: data.password, role: data.role })
      toast.success('Account created! Please login.')
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
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-blue-900 mb-2">Create Account</h1>
          <p className="text-slate-400 text-sm">Join Prarthna Clinic — manage your appointments online</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label">Full Name</label>
              <input {...register('name')} placeholder="Rahul Sharma" className="input-field" />
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
            <div>
              <label className="label">Register As</label>
              <select {...register('role')} className="input-field">
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
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
