# 📗 CodeBuddy Backend — RESTful API for Peer Mentorship Platform

This is the **backend API** for [CodeBuddy](https://github.com/your-frontend-repo), a peer-to-peer student mentorship platform that enables mentees and mentors to connect based on academic degrees and interests.

Built using **Node.js** and **Express.js**, this server handles user authentication, mentorship request flows, role-based access control, and session persistence.

---

## 🚀 Key Features

- ✅ Secure user registration & login (bcrypt password hashing)
- ✅ Role-based access control (Mentee, Mentor, Admin)
- ✅ Mentor suggestion endpoint filtered by degree
- ✅ Mentorship request creation, update, and listing
- ✅ Admin routes for managing users and generating reports
- ✅ RESTful API with modular route handling
- ✅ CORS enabled for frontend consumption
- ✅ Middleware-based request validation and protection

---

## 🛠️ Tech Stack

| Tech/Library           | Purpose                                  |
|------------------------|------------------------------------------|
| **Node.js + Express**  | Server-side logic and routing            |
| **MySQL** or **PostgreSQL** | Relational data storage (via SQL)     |
| **bcryptjs**           | Password hashing                         |
| **jsonwebtoken (JWT)** | User authentication and session tokens   |
| **dotenv**             | Environment variable management          |
| **cors**               | Cross-Origin Resource Sharing             |
| **morgan** (optional)  | HTTP request logging (for dev/debug)     |

---

## 📁 Folder Structure

