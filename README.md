# Blog Admin Dashboard

## 📌 Overview
A production-style Blog Admin Dashboard built using React, Vite, and Tailwind CSS.
This project allows users to create, manage, and organize blog posts with local persistence.

## 🚀 Features
- Responsive Admin Layout (Sidebar + Navbar)
- Add Blog form with validation
- Image upload (JPG/PNG) with preview & size check
- LocalStorage persistence
- Dashboard blog listing
- Search by blog title
- Filter by status (Draft / Published)
- Pagination
- Delete blog functionality

## 🛠️ Tech Stack
- React (Vite)
- React Router DOM
- Tailwind CSS
- LocalStorage API

## ▶️ How to Run the Project
```bash
npm install
npm run dev

💾 Data Persistence

All blog data is stored in browser LocalStorage under the key blogs.
Data remains available even after page refresh.

📱 Responsive Design

Desktop: Sidebar visible

Mobile: Sidebar hidden for better UX

🧠 Logic Implemented

URL Live Project
================

https://blog-dashboard-three-psi.vercel.app/

Status-based filtering (Draft / Published)

Client-side pagination

Image validation before saving
