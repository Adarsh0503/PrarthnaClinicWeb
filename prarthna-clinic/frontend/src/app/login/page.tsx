'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { authAPI } from '@/lib/api'
import { Eye, EyeOff } from 'lucide-react'

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const quickLogin = (email: string, password: string) => {
    setValue('email', email, { shouldValidate: true })
    setValue('password', password, { shouldValidate: true })
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await authAPI.login(data)
      const userData = res.data.data ?? res.data
      localStorage.setItem('token', userData.token)
      localStorage.setItem('user', JSON.stringify(userData))
      window.dispatchEvent(new Event('auth-change'))
      toast.success('Login successful!')
      const role = userData.role?.toLowerCase()
      if (role === 'admin') {
        window.location.href = '/admin'
      } else if (role === 'doctor') {
        window.location.href = '/doctor/dashboard'
      } else {
        window.location.href = '/'
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Login failed. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-blue-900 mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Sign in to your Prarthna Clinic account</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <input {...register('email')} type="email" placeholder="you@example.com" className="input-field" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-field pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center mb-3">Quick login</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Admin',        email: 'admin@prartnaclinic.in',    password: 'Admin@123' },
                { label: 'Dr. Paritosh', email: 'paritosh@prartnaclinic.in', password: 'Doctor@123' },
                { label: 'Dr. Rajni',    email: 'rajni@prartnaclinic.in',    password: 'Doctor@123' },
              ].map(({ label, email, password }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => quickLogin(email, password)}
                  className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg py-2 px-2 transition-colors text-center"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-slate-400 mt-5">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}