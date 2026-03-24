# 🏥 Prarthna Multispeciality Clinic — Full Stack Web App

> Complete Dental & Health Care — Tigri Colony, Delhi & Faridabad

A modern, production-ready full-stack clinic website built with **Next.js 14** (frontend) and **Spring Boot 3** (backend).

---

## 📁 Project Structure

```
prarthna-clinic/
├── frontend/          # Next.js 14 + Tailwind CSS + TypeScript
├── backend/           # Spring Boot 3 + Java 17 + MySQL + JWT
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.8+
- MySQL 8+ (or use H2 in-memory for dev)

---

## 🖥️ Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Copy env file
cp .env.local.example .env.local

# Run dev server
npm run dev
```

Runs at → **http://localhost:3000**

### Build for production
```bash
npm run build
npm start
```

---

## ⚙️ Backend Setup (Spring Boot)

### 1. Create MySQL database
```sql
CREATE DATABASE prarthna_clinic;
```

### 2. Configure `application.properties`
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/prarthna_clinic
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 3. Run the application
```bash
cd backend
mvn spring-boot:run
```

Runs at → **http://localhost:8080**

### Using H2 (no MySQL needed for dev)
Uncomment the H2 lines in `application.properties` and comment out MySQL lines.

---

## 🔑 Default Credentials (seeded on first run)

| Role    | Email                        | Password    |
|---------|------------------------------|-------------|
| Admin   | admin@prartnaclinic.in       | Admin@123   |
| Doctor  | paritosh@prartnaclinic.in    | Doctor@123  |
| Doctor  | rajni@prartnaclinic.in       | Doctor@123  |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint              | Description        | Auth |
|--------|-----------------------|--------------------|------|
| POST   | /api/auth/register    | Register user      | No   |
| POST   | /api/auth/login       | Login              | No   |

### Doctors
| Method | Endpoint                      | Description              | Auth       |
|--------|-------------------------------|--------------------------|------------|
| GET    | /api/doctors                  | List all doctors         | No         |
| GET    | /api/doctors?search=&spec=    | Search doctors           | No         |
| GET    | /api/doctors/{id}             | Get doctor details       | No         |
| PUT    | /api/doctors/{id}             | Update doctor profile    | Doctor     |
| GET    | /api/doctors/{id}/reviews     | Get doctor reviews       | No         |
| POST   | /api/doctors/{id}/reviews     | Add a review             | Patient    |
| DELETE | /api/doctors/reviews/{id}     | Delete a review          | Patient    |

### Bookings
| Method | Endpoint                      | Description              | Auth       |
|--------|-------------------------------|--------------------------|------------|
| POST   | /api/bookings                 | Create booking           | Patient    |
| GET    | /api/bookings/my              | My bookings              | Patient    |
| GET    | /api/bookings/doctor          | Doctor's bookings        | Doctor     |
| PATCH  | /api/bookings/{id}/approve    | Approve booking          | Doctor     |
| PATCH  | /api/bookings/{id}/cancel     | Cancel booking           | Any auth   |

### Users
| Method | Endpoint              | Description        | Auth     |
|--------|-----------------------|--------------------|----------|
| GET    | /api/users/profile    | Get my profile     | Any auth |
| PUT    | /api/users/profile    | Update my profile  | Any auth |

### Admin
| Method | Endpoint                          | Description              | Auth  |
|--------|-----------------------------------|--------------------------|-------|
| GET    | /api/admin/doctors                | All doctors (any status) | Admin |
| PATCH  | /api/admin/doctors/{id}/approve   | Approve doctor           | Admin |
| PATCH  | /api/admin/doctors/{id}/reject    | Reject doctor            | Admin |
| GET    | /api/admin/users                  | All users                | Admin |
| GET    | /api/admin/bookings               | All bookings             | Admin |
| GET    | /api/admin/stats                  | Dashboard stats          | Admin |

---

## 🌐 Pages (Frontend)

| Route        | Description                  |
|--------------|------------------------------|
| /            | Home — hero, services, doctors, FAQ, testimonials |
| /doctors     | All doctors listing          |
| /services    | All medical services         |
| /booking     | Book an appointment form     |
| /login       | Patient / Doctor login       |
| /register    | New account registration     |
| /contact     | Contact page with addresses  |
| /about       | About the clinic             |

---

## 🖼️ Adding Real Images

Place your photos in `frontend/public/images/`:

```
frontend/public/images/
├── logo.png              ← Clinic logo
├── dr-paritosh.jpg       ← Dr. Paritosh Mishra photo
├── dr-rajni.jpg          ← Dr. Rajni Mishra photo
└── doctors-together.jpg  ← Both doctors together
```

---

## 🚢 Deployment

### Frontend → Vercel
```bash
# Push to GitHub, then connect repo to vercel.com
# Set env var: NEXT_PUBLIC_API_URL=https://your-backend.com
```

### Backend → Railway / Render / AWS
```bash
mvn clean package -DskipTests
# Upload the JAR from target/ to your server
java -jar target/clinic-backend-1.0.0.jar
```

---

## 🛠️ Tech Stack

| Layer     | Technology                                  |
|-----------|---------------------------------------------|
| Frontend  | Next.js 14, React 18, TypeScript, Tailwind  |
| Backend   | Spring Boot 3, Java 17, Spring Security     |
| Database  | MySQL 8 (H2 for dev/test)                   |
| Auth      | JWT (jjwt 0.12)                             |
| ORM       | Spring Data JPA / Hibernate                 |
| Validation| Bean Validation (jakarta)                   |

---

## 📞 Clinic Info

- **Tigri Colony:** G-1916, Mehrauli Badarpur Road, Tigri Colony, Sangam Vihar, New Delhi – 110080
- **Faridabad:** Sun Rise Hospital, Sector 15, Faridabad – 121007
- **Timings:** Mon–Sat 11AM–7PM | Sun 11AM–2PM
- **Phone:** +91-129-400-0000

---

*Built with ❤️ for Prarthna Multispeciality Clinic*
