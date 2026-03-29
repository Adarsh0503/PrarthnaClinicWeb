'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

interface DoctorProfile {
  id: number
  name: string
  email: string
  phone: string
  specialization: string
  qualification: string
  hospital: string
  bio: string
  about: string
  experience: number
  ticketPrice: number
  photo: string | null
}

export default function DoctorProfileSetup() {
  const router = useRouter()
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [uploading, setUploading] = useState(false)
  const [doctorId, setDoctorId] = useState<number | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', phone: '', specialization: '', qualification: '',
    hospital: '', bio: '', about: '', experience: '', ticketPrice: '',
  })

  const loadProfile = useCallback(async () => {
    const stored = localStorage.getItem('user')
    if (!stored) { router.push('/login'); return }
    const u = JSON.parse(stored)
    if (u.role?.toLowerCase() !== 'doctor') { router.push('/'); return }
    setDoctorId(u.id)

    try {
      const res = await fetch(`${API}/api/doctors/${u.id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      const data = await res.json()
      const d: DoctorProfile = data.data
      setPhotoUrl(d.photo)
      setForm({
        name:           d.name || '',
        phone:          d.phone || '',
        specialization: d.specialization || '',
        qualification:  d.qualification || '',
        hospital:       d.hospital || '',
        bio:            d.bio || '',
        about:          d.about || '',
        experience:     d.experience?.toString() || '',
        ticketPrice:    d.ticketPrice?.toString() || '',
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { loadProfile() }, [loadProfile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !doctorId) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${API}/api/doctors/${doctorId}/photo`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      })
      const data = await res.json()
      setPhotoUrl(data.data)
      toast.success('Photo uploaded!')
    } catch (e) {
      toast.error('Photo upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!doctorId) return
    setSaving(true)
    try {
      await fetch(`${API}/api/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name:           form.name,
          phone:          form.phone,
          specialization: form.specialization,
          qualification:  form.qualification,
          hospital:       form.hospital,
          bio:            form.bio,
          about:          form.about,
          experience:     form.experience ? parseInt(form.experience) : null,
          ticketPrice:    form.ticketPrice ? parseFloat(form.ticketPrice) : null,
        }),
      })
      toast.success('Profile updated successfully!')
    } catch (e) {
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-800 py-10 px-6 text-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-blue-300 text-sm mb-1">Doctor Portal</p>
          <h1 className="font-serif text-3xl font-bold">My Profile</h1>
          <p className="text-blue-200 text-sm mt-1">Keep your profile updated for patients to see</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

        {/* Photo upload */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="font-semibold text-blue-900 mb-4">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-blue-50 border border-blue-100 shrink-0">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">👨‍⚕️</div>
              )}
            </div>
            <div>
              <label className="btn-outline text-sm py-2 px-4 cursor-pointer inline-block">
                {uploading ? 'Uploading...' : 'Upload Photo'}
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
              </label>
              <p className="text-xs text-slate-400 mt-2">JPG, PNG. Max 5MB. Square photo recommended.</p>
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-semibold text-blue-900">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Dr. Your Name" />
            </div>
            <div>
              <label className="label">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+91 98765 00000" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Specialization</label>
              <input name="specialization" value={form.specialization} onChange={handleChange} className="input-field" placeholder="General Physician" />
            </div>
            <div>
              <label className="label">Qualification</label>
              <input name="qualification" value={form.qualification} onChange={handleChange} className="input-field" placeholder="MBBS, MD" />
            </div>
          </div>
          <div>
            <label className="label">Hospital / Clinic</label>
            <input name="hospital" value={form.hospital} onChange={handleChange} className="input-field" placeholder="Sun Rise Hospital, Faridabad" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Years of Experience</label>
              <input name="experience" type="number" value={form.experience} onChange={handleChange} className="input-field" placeholder="10" />
            </div>
            <div>
              <label className="label">Consultation Fee (₹)</label>
              <input name="ticketPrice" type="number" value={form.ticketPrice} onChange={handleChange} className="input-field" placeholder="500" />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-semibold text-blue-900">About You</h2>
          <div>
            <label className="label">Short Bio <span className="text-slate-400 text-xs">(shown on doctor card)</span></label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={2} className="input-field resize-none" placeholder="Senior Physician & Founder of Prarthna Clinic" />
          </div>
          <div>
            <label className="label">Full About <span className="text-slate-400 text-xs">(shown on profile page)</span></label>
            <textarea name="about" value={form.about} onChange={handleChange} rows={4} className="input-field resize-none" placeholder="Detailed description of your expertise, experience and approach to patient care..." />
          </div>
        </div>

        {/* Save button */}
        <div className="flex gap-3">
          <button onClick={handleSave} disabled={saving} className="btn-primary px-8 py-3 disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
          <button onClick={() => router.push('/doctor/dashboard')} className="btn-outline px-6 py-3">
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}