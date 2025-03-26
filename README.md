# Algoroot Frontend Task 🚀

A **Next.js 15** application with user authentication and a dashboard featuring a data table with filtering and sorting capabilities. This project uses **TypeScript**, **Tailwind CSS**, and **ShadCN** for styling. User authentication is implemented using **localStorage** and **bcryptjs** for secure password encryption.

---

## 📁 **Folder Structure**
```
algoroot-frontend/
│
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── auth/
│   ├── dashboard/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── DataTable.tsx
│   └── ui/
│       └── (ShadCN components)
│
├── context/
│   └── AuthContext.tsx
│
├── lib/
│   └── utils.ts
├── styles/
│   └── globals.css
├── public/
│   └── favicon.ico
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## 🔧 **Tech Stack**
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & ShadCN UI Components
- **Authentication:** LocalStorage & bcryptjs for secure password encryption
- **Icons:** React Icons

---

## ⚙️ **Setup and Installation**

1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/algoroot-frontend.git
cd algoroot-frontend
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Install `bcryptjs`:**
```bash
npm install bcryptjs
```

4. **Run the Development Server:**
```bash
npm run dev
```
Visit **`http://localhost:3000`** to view the app.

---

## 🔐 **Features**
### **Authentication**
- **Signup:** Register with email and encrypted password.
- **Login:** Authenticate using the stored encrypted password.
- **Password Security:** Passwords are hashed using **bcryptjs** before saving.

### **Dashboard**
- **Data Table:** Displays mock data with:
  - **Sorting** (Ascending/Descending)
  - **Filtering** (Search by name)
  - **Pagination** (Limited rows per page)
- **Navbar:** 
  - Shows logged-in user details.
  - User icon with a dropdown menu for:
    - Logout
    - Delete Account (removes from local storage)
- **Sidebar:** Navigates to the **Details** page.

---

## 🔥 **Usage Instructions**
1. **Signup:** Create an account on the Signup page.
2. **Login:** Access the dashboard using registered credentials.
3. **Delete Account:** Deletes user data permanently from local storage.

---

## 📂 **Environment Variables**
No environment variables are required for this setup.

---

## 🛡️ **Security Considerations**
- **bcryptjs** for hashing passwords.
- LocalStorage is used for simplicity, but consider **HTTP-only cookies** for sensitive projects.

---

## 📬 **Contact**
If you have any questions, feel free to reach out!
