<div align="center">

<img src="prarthna-images/logo.png" alt="Prarthna Clinic Logo" width="120" />

# Prarthna Multispeciality Clinic

### Complete Dental & Health Care · Tigri Colony, Delhi & Faridabad

[![Live Site](https://img.shields.io/badge/Live-prarthna--clinic--web.vercel.app-blue?style=for-the-badge&logo=vercel)](https://prarthna-clinic-web.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://docker.com)

*Trusted healthcare since 2011 · 5000+ patients treated · 15+ years of compassionate care*

</div>

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Meet the Doctors](#meet-the-doctors)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Seeded Data](#seeded-data)
- [Known Issues & Improvements](#known-issues--improvements)

---

## Overview

**Prarthna Multispeciality Clinic** is a full-stack, production-deployed web application for a real multispeciality clinic in Delhi NCR. It handles the complete patient journey — from discovering doctors to booking and managing appointments — with separate dashboards for patients, doctors, and admins.

The clinic offers **General Medicine & Diabetology** (Dr. Paritosh Mishra, MBBS) and **Complete Dental Care** (Dr. Rajni Mishra, BDS), alongside lab diagnostics, paediatric care, women's health, and chronic disease management.

---

## Screenshots

### Home — Hero Section

<img src="prarthna-images/doctors-together.jpg" alt="Prarthna Clinic Doctors" width="100%" style="border-radius: 12px; margin-bottom: 8px;" />

*Dr. Paritosh Mishra and Dr. Rajni Mishra — the founding doctors of Prarthna Clinic*

### Dental Care Services

<img src="prarthna-images/dental-care.jpg" alt="Dental Care at Prarthna Clinic" width="100%" style="border-radius: 12px;" />

*State-of-the-art dental services by Dr. Rajni Mishra, BDS*

---

## Meet the Doctors

<table>
<tr>
<td align="center" width="50%">

<img src="prarthna-images/dr-paritosh.jpg" alt="Dr. Paritosh Mishra" width="200" style="border-radius: 50%; object-fit: cover;" />

### Dr. Paritosh Mishra
**MBBS · Senior Physician & Founder**

- 🏥 Sun Rise Hospital, Faridabad
- ⭐ 4.9 rating · 872 reviews
- 👥 2000+ patients treated
- 💼 20 years of experience
- 💊 General Medicine, Diabetes, Hypertension
- 📞 +91-9599752226
- 💰 Consultation: ₹500

*Founder of Prarthna Clinic. Specialises in general medicine, diabetes management, and hypertension across Delhi NCR.*

</td>
<td align="center" width="50%">

<img src="prarthna-images/dr-rajni.jpg" alt="Dr. Rajni Mishra" width="200" style="border-radius: 50%; object-fit: cover;" />

### Dr. Rajni Mishra
**BDS · Dental Specialist**

- 🏥 Prarthna Clinic, Tigri Colony, Delhi
- ⭐ 4.8 rating · 272 reviews
- 👥 1500+ patients treated
- 💼 15 years of experience
- 🦷 Cosmetic Dentistry, Root Canal, Orthodontics
- 💰 Consultation: ₹400

*Known for her gentle, patient-first approach. Expert in cosmetic dentistry, orthodontics, RCT, and paediatric dentistry.*

</td>
</tr>
</table>

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.2.3 | React framework (App Router) |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^3.4.1 | Utility-first styling |
| Framer Motion | ^11.0.24 | Animations |
| Radix UI | Various | Accessible primitives (Dialog, Select, Accordion, Tabs) |
| React Hook Form | ^7.51.1 | Form management |
| Zod | ^3.22.4 | Schema validation |
| Axios | ^1.6.7 | HTTP client |
| lucide-react | ^0.363.0 | Icons |
| react-hot-toast | ^2.4.1 | Toast notifications |
| date-fns | ^3.6.0 | Date formatting |
| jwt-decode | ^4.0.0 | JWT parsing |
| js-cookie | ^3.0.5 | Cookie utilities |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Spring Boot | 3.2.4 | Application framework |
| Java | 17 | Runtime |
| Spring Security | (Boot managed) | Auth + role-based access |
| Spring Data JPA | (Boot managed) | ORM layer |
| PostgreSQL | 16 | Production database |
| H2 | (runtime) | Test database |
| JJWT | 0.12.5 | JWT generation & validation |
| Lombok | (Boot managed) | Boilerplate reduction |
| ModelMapper | 3.2.0 | DTO mapping |
| Cloudinary | 1.38.0 | Image upload (optional) |
| BCrypt | (Spring Security) | Password hashing |

### Infrastructure
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Docker (multistage) | Backend containerisation |
| PostgreSQL (Render/Railway) | Production database |
| AWS S3 | Doctor photo storage |

---

## Features

### Public
- **Home page** — hero, trust bar, services, doctors section, about, FAQ, testimonials, booking strip
- **Doctors listing** — all approved doctors with ratings, specialization, experience, and pricing
- **Doctor profile** — full bio, time slots, patient reviews
- **Services page** — all medical and dental services with booking CTAs
- **About page** — clinic story, values, team section
- **Contact page** — contact form, phone, email, clinic hours

### Patient
- Register / login with JWT authentication
- Book appointments (select doctor → date → time slot → reason)
- View and cancel own bookings
- Leave reviews on doctors (one per doctor)
- Profile management (name, phone, gender, blood type)

### Doctor
- Register (pending admin approval)
- Edit profile (specialization, qualification, bio, experience, pricing)
- Manage time slots (add/remove by day with start/end time)
- View own appointment bookings
- Approve or cancel appointments

### Admin
- Dashboard with stats (total users, doctors, bookings)
- View and manage all users
- Approve or reject pending doctor registrations
- View all bookings across the system
- Book appointments on behalf of patients

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Frontend                      │
│  (Vercel · App Router · TypeScript · Tailwind)          │
│                                                          │
│  Public Pages    Auth Pages    Role Dashboards           │
│  ─────────────   ──────────    ───────────────           │
│  Home            Login         Patient Dashboard         │
│  Doctors         Register      Doctor Dashboard          │
│  Services                      Admin Dashboard           │
│  About                                                   │
│  Contact                                                 │
│                                                          │
│         Axios (lib/api.ts) · JWT Bearer Token           │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS REST API
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Spring Boot Backend                         │
│         (Docker · Java 17 · Port 8081)                  │
│                                                          │
│  JwtAuthFilter → Spring Security → Role-based access    │
│                                                          │
│  /api/auth/**          Public                           │
│  GET /api/doctors/**   Public                           │
│  /api/bookings/**      Authenticated                    │
│  /api/admin/**         ADMIN only                       │
│                                                          │
└────────────────────┬────────────────────────────────────┘
                     │ JPA / Hibernate
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                      │
│                                                          │
│   users ──────────────────────────── bookings           │
│   doctors ─────────────────────────┘                    │
│       └──── time_slots                                   │
│       └──── reviews                                      │
└─────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
prarthna-clinic/
├── frontend/                          # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx               # Home page
│   │   │   ├── layout.tsx             # Root layout (fonts, navbar, footer)
│   │   │   ├── globals.css            # Global styles
│   │   │   ├── about/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── doctors/
│   │   │   │   ├── page.tsx           # Doctor listing
│   │   │   │   └── [id]/page.tsx      # Doctor profile
│   │   │   ├── booking/
│   │   │   │   ├── page.tsx
│   │   │   │   └── BookingContent.tsx # Main booking form (auth-gated)
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── patient/dashboard/page.tsx
│   │   │   ├── doctor/
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   └── profile/page.tsx
│   │   │   └── admin/page.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── sections/
│   │   │       ├── HeroSection.tsx
│   │   │       ├── TrustBar.tsx
│   │   │       ├── ServicesSection.tsx
│   │   │       ├── DoctorsSection.tsx
│   │   │       ├── AboutSection.tsx
│   │   │       ├── TestimonialsSection.tsx
│   │   │       ├── FaqSection.tsx
│   │   │       └── BookingStrip.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.tsx            # AuthContext + AuthProvider
│   │   ├── lib/
│   │   │   └── api.ts                 # Axios instance + all API modules
│   │   └── types/
│   │       └── index.ts               # TypeScript interfaces
│   ├── public/images/                 # Static assets
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── package.json
│
└── backend/                           # Spring Boot application
    ├── src/main/java/com/prarthna/clinic/
    │   ├── ClinicApplication.java
    │   ├── config/
    │   │   ├── AppConfig.java
    │   │   ├── SecurityConfig.java
    │   │   └── DataSeeder.java        # Seeds admin + 2 doctors on startup
    │   ├── controller/
    │   │   ├── AuthController.java    # POST /api/auth/register, /login
    │   │   ├── DoctorController.java  # CRUD + reviews
    │   │   ├── BookingController.java # Create, list, approve, cancel
    │   │   ├── UserController.java    # Profile get/update
    │   │   └── AdminController.java   # Admin-only operations
    │   ├── service/
    │   │   ├── AuthService.java
    │   │   ├── BookingService.java
    │   │   ├── DoctorService.java
    │   │   └── ReviewService.java
    │   ├── entity/
    │   │   ├── User.java
    │   │   ├── Doctor.java
    │   │   ├── Booking.java
    │   │   ├── TimeSlot.java
    │   │   └── Review.java
    │   ├── dto/Dto.java               # All DTOs in one file
    │   ├── repository/                # JPA repositories
    │   ├── security/
    │   │   ├── JwtAuthFilter.java
    │   │   ├── JwtUtils.java
    │   │   └── CustomUserDetailsService.java
    │   └── exception/
    │       ├── GlobalExceptionHandler.java
    │       ├── BadRequestException.java
    │       └── ResourceNotFoundException.java
    ├── src/test/
    ├── Dockerfile
    └── pom.xml
```

---

## Data Model

### Entity Relationships

```
users (id, name, email, password, phone, photo, gender, bloodType, role)
  role: patient | doctor | admin

doctors (id, name, email, password, phone, photo, specialization,
         qualification, hospital, bio, about, experience, ticketPrice,
         averageRating, totalRating, totalPatients, isApproved)
  isApproved: pending | approved | cancelled

bookings (id, doctor_id, user_id, appointmentDate, timeSlot,
          reason, ticketPrice, status, isPaid, createdAt, updatedAt)
  status: pending | approved | cancelled

time_slots (id, doctor_id, day, startTime, endTime, isAvailable)
  day: Monday | Tuesday | ... | Sunday

reviews (id, doctor_id, user_id, rating, reviewText, createdAt)
  rating: 1–5  ·  one review per user per doctor
```

> **Note:** Doctors authenticate through a separate `doctors` table. `CustomUserDetailsService` checks both `users` and `doctors` tables on every login.

---

## API Reference

All responses follow:
```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

### Auth — Public

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{name, email, password, phone, role}` | Register patient or doctor |
| POST | `/api/auth/login` | `{email, password}` | Login, returns JWT |

### Doctors — Public

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/doctors` | All approved doctors (supports `?specialization=&search=`) |
| GET | `/api/doctors/{id}` | Doctor detail with reviews |
| GET | `/api/doctors/{id}/reviews` | Doctor's reviews |

### Doctors — Protected

| Method | Endpoint | Role | Description |
|---|---|---|---|
| PUT | `/api/doctors/{id}` | DOCTOR / ADMIN | Update profile + time slots |
| POST | `/api/doctors/{id}/reviews` | PATIENT | Submit review |
| DELETE | `/api/reviews/{reviewId}` | Authenticated | Delete own review |

### Bookings — Authenticated

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/my` | Patient's own bookings |
| GET | `/api/bookings/doctor` | Doctor's incoming bookings |
| PATCH | `/api/bookings/{id}/approve` | Doctor approves booking |
| PATCH | `/api/bookings/{id}/cancel` | Cancel booking |

### Users — Authenticated

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/profile` | Get own profile |
| PUT | `/api/users/profile` | Update own profile |

### Admin — ADMIN only

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/doctors` | All doctors (including pending) |
| PATCH | `/api/admin/doctors/{id}/approve` | Approve doctor |
| PATCH | `/api/admin/doctors/{id}/reject` | Reject doctor |
| GET | `/api/admin/users` | All registered users |
| GET | `/api/admin/bookings` | All bookings |
| GET | `/api/admin/stats` | `{totalUsers, totalDoctors, totalBookings}` |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- Maven 3.9+
- PostgreSQL 14+ (or use H2 for local dev)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/PrarthnaClinicWeb.git
cd PrarthnaClinicWeb/prarthna-clinic
```

### 2. Backend setup

```bash
cd backend

# Copy and configure environment
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Edit application.properties with your DB credentials (see Environment Variables)

# Run with Maven
./mvnw spring-boot:run

# Or build and run JAR
./mvnw clean package -DskipTests
java -jar target/clinic-backend-1.0.0.jar
```

The backend starts on **port 8081** by default.

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local
# Edit .env.local: set NEXT_PUBLIC_API_URL=http://localhost:8081

# Run development server
npm run dev
```

The frontend starts on **http://localhost:3000**.

### 4. Using Docker (backend only)

```bash
cd backend
docker build -t prarthna-clinic-backend .
docker run -p 8081:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/prarthnadb \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=yourpassword \
  -e JWT_SECRET=your-secret-key-min-32-chars \
  -e CORS_ALLOWED_ORIGINS=http://localhost:3000 \
  prarthna-clinic-backend
```

---

## Environment Variables

### Backend (`application.properties` or environment)

| Variable | Description | Default |
|---|---|---|
| `SPRING_DATASOURCE_URL` | PostgreSQL JDBC URL | — (required) |
| `SPRING_DATASOURCE_USERNAME` | DB username | — (required) |
| `SPRING_DATASOURCE_PASSWORD` | DB password | — (required) |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | Fallback key (change in prod!) |
| `PORT` | Server port | `8081` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowed origins | `https://prarthna-clinic-web.vercel.app` |
| `LOG_LEVEL` | Logging level for `com.prarthna` | `DEBUG` |

### Frontend (`.env.local`)

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8080` |

---

## Deployment

### Frontend — Vercel

1. Push to GitHub
2. Import repository in [Vercel dashboard](https://vercel.com)
3. Set root directory to `prarthna-clinic/frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url`
5. Deploy

### Backend — Docker + Railway / Render

```bash
# Build the multistage Docker image
docker build -t prarthna-backend ./backend

# Push to your container registry
docker tag prarthna-backend your-registry/prarthna-backend:latest
docker push your-registry/prarthna-backend:latest
```

Set these environment variables in your hosting provider:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<dbname>
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
JWT_SECRET=<your-long-random-secret>
CORS_ALLOWED_ORIGINS=https://prarthna-clinic-web.vercel.app
PORT=8080
```

The Dockerfile uses a **multistage build**:
- Stage 1: Maven + JDK 17 → builds the JAR
- Stage 2: Eclipse Temurin 17 JRE Alpine → runs the JAR (lightweight ~100MB image)

---

## Seeded Data

On first startup, `DataSeeder` automatically creates:

### Admin Account
| Field | Value |
|---|---|
| Email | `admin@prartnaclinic.in` |
| Password | `Admin@123` |
| Role | `admin` |

### Doctor Accounts
| Field | Dr. Paritosh | Dr. Rajni |
|---|---|---|
| Email | `parit1605@gmail.com` | `rajni@prartnaclinic.in` |
| Password | `Doctor@123` | `Doctor@123` |
| Specialization | General Physician & Diabetologist | Dentist |
| Status | Approved | Approved |
| Consultation | ₹500 | ₹400 |

Both doctors have time slots seeded:
- **Mon–Sat:** 11:00 AM – 7:00 PM
- **Sunday:** 11:00 AM – 2:00 PM

---

## Clinic Information

| Detail | Value |
|---|---|
| **Clinic Name** | Prarthna Multispeciality Clinic |
| **Founded** | 2011 |
| **Locations** | Tigri Colony, Sangam Vihar, Delhi & Faridabad |
| **Phone** | +91-9599752226 |
| **Email** | parit1605@gmail.com |
| **Hours** | Mon–Sat: 11AM–7PM · Sunday: 11AM–2PM |
| **Services** | General Medicine · Dentistry · Lab & Diagnostics · Paediatrics · Women's Health · Chronic Disease Management |

---

## Known Issues & Improvements

### Security
- The JWT secret has a hardcoded fallback in `application.properties`. In production, always set `JWT_SECRET` as an environment variable and remove the default.
- `http.headers(h -> h.frameOptions(f -> f.disable()))` disables X-Frame-Options globally (leftover from H2 console dev). Should be scoped to dev profile only.
- The `/api/auth/register` endpoint accepts `role=admin` without restriction. Consider blocking self-registration as admin at the API level.

### Code Quality
- `BookingService.java` contains the entire original implementation as commented-out code above the live implementation. The commented block can be safely removed.
- `userAPI.update` in `api.ts` sends `multipart/form-data`, but `UserController.updateProfile` expects `@RequestBody` JSON. These are mismatched.

### Features
- **Time slots in the booking form are hardcoded** on the frontend (`['11:00 AM', '12:00 PM', ...]`). The API endpoint `/api/doctors/{id}/slots` exists in `api.ts` but is unused — the form should fetch the doctor's actual `TimeSlot` records.
- **No payment integration.** The `isPaid` and `ticketPrice` fields exist on `Booking` as placeholders for a future payment gateway (Razorpay recommended for India).
- **Email notifications** — Spring Mail dependency is included but disabled via `spring.autoconfigure.exclude`. Re-enabling and configuring SMTP would allow booking confirmation emails.
- **Image uploads** — Cloudinary dependency is included. The profile photo update endpoints are scaffolded but not fully wired end-to-end.

---

## License

Private project — Prarthna Multispeciality Clinic. All rights reserved.

---

<div align="center">

Built with ❤️ for **Prarthna Multispeciality Clinic**

*Serving Delhi NCR families since 2011*

<img src="prarthna-images/doctors-together.jpg" alt="Prarthna Clinic Team" width="400" style="border-radius: 16px; margin-top: 16px;" />

</div>