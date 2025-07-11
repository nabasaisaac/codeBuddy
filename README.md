# CodeBuddy Backend 

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
CodeBuddy-backend/
├── controllers/ # Business logic for routes
│ ├── authController.js
│ ├── mentorController.js
│ └── adminController.js
├── middleware/ # Auth & role-check middleware
│ ├── authMiddleware.js
│ └── roleMiddleware.js
├── models/ # SQL queries or ORM definitions
│ └── db.js
├── routes/ # Express route definitions
│ ├── authRoutes.js
│ ├── mentorRoutes.js
│ └── adminRoutes.js
├── utils/ # Utility functions (e.g. validators)
├── .env # Environment config (e.g. DB, JWT_SECRET)
├── server.js # Main app entry point
├── package.json
└── README.md

## Setup & Installation
1. Clone the repository

git clone https://github.com/your-username/CodeBuddy-backend.git
cd CodeBuddy-backend

2. Install dependencies
npm install

3.Create a .env file

PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=codebuddy_db

4. Start the server

npm run dev   # Uses nodemon for hot reload

## 🧪 Sample Request

POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}
## Response


{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "user_id": 4,
    "name": "John Doe",
    "role": "Mentor",
    "degree": "BSCS"
  }
}
## 🧠 Future Improvements
📊 Admin dashboard charts for engagement tracking

🔔 Real-time notifications (e.g., via WebSockets)

📅 Session scheduling support

📬 Email notifications

## 👨‍💻 Contributing
1. Fork the repo

2. Create a feature branch (git checkout -b feature/my-feature)

3. Commit your changes

4. Push to the branch

5. Open a Pull Request

## License

This project is licensed under the MIT License.

Thanks , have fun!









