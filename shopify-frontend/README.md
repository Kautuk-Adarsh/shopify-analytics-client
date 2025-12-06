# 📊 Xeno Intern Dashboard - Frontend

## 📌 Project Overview
. It is a real-time analytics dashboard built with **Next.js** that visualizes Shopify store data (Revenue, Sales Trends, Top Customers) ingested by our separate backend service.
---

## 🛠 Tech Stack

*   **Framework:** Next.js 14 (App Router)
*   **Styling:** Tailwind CSS
*   **Charts:** Recharts
*   **Icons:** Lucide React
*   **HTTP Client:** Axios (with Interceptors for multi-tenant headers)

---

## ✨ Key Features

### 1. Secure Login
*   Authentication gate that validates tenant credentials against the backend API.
*   Persists session securely using LocalStorage (`x-shop-id`) to maintain tenant context across reloads.

### 2. Real-Time Dashboard
*   **Auto-Polling:** Data refreshes automatically every **5 seconds** to reflect the latest sync events from the backend.
*   **Stats Grid:** Instant view of high-level metrics: Total Revenue, Total Orders, and Customer count.

### 3. Data Visualization
*   **Sales Chart:** Interactive line chart showing revenue trends over time.
*   **Leaderboard:** "Top Customers" table ranked by Lifetime Value (LTV), featuring generated avatar initials.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
*   Node.js (v18 or higher)
*   The **Backend Service** must be running locally or deployed to serve data.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/xeno-frontend.git
cd xeno-frontend
npm install
```

### 3. Environment Configuration
Create a file named `.env` in the root directory. This tells the frontend where to find your API.

**File:** `.env`
```bash
# If running backend locally:
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# If backend is deployed (e.g., Render/Railway):
# NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com/api
```

### 4. Run the Development Server
Start the application locally:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── login/           # Authentication page
│   ├── page.jsx         # Main Dashboard (Protected Route)
│   └── layout.js        # Global layout & metadata
├── components/
│   ├── StatsGrid.jsx    # Revenue/Order cards
│   ├── SalesChart.jsx   # Recharts visualization
│   └── TopCustomers.jsx # Leaderboard table
└── api/
    └── index.js         # Centralized Axios instance & Interceptors
```

---

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push this code to GitHub.
2.  Import the project into Vercel.
3.  **Crucial Step:** In Vercel Project Settings > Environment Variables, add:
    *   Key: `NEXT_PUBLIC_API_URL`
    *   Value: `https://your-backend-service.onrender.com/api` (The URL of your live backend)
4.  Deploy!

---

## 🔗 Connection to Backend

This frontend relies on the backend service to handle:
*   **Shopify Data Ingestion** (via Cron Jobs)
*   **Database Persistence** (PostgreSQL)
*   **Tenant Authentication**

> ⚠️ **Note:** Please ensure the backend is running and actively ingesting data before testing the dashboard. If the charts are empty, trigger a manual sync via the backend API or wait for the cron job to run.