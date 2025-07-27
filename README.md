# Bynry-Backend-Task
Task assign by the Bynry for the backend developer intern

# 📦 StockFlow - Bynry Backend Engineering Intern Task

A backend system to manage **companies, warehouses, products, inventories, suppliers, and alerts** for low-stock conditions — built with **Node.js**, **Express**, and **MongoDB**.

> 🚀 Designed as part of the Bynry Backend Engineering Internship selection.

---

## 📁 Project Structure
stockflow-backend/
├── models/ # Mongoose schemas
├── routes/ # API route handlers
├── config/ # DB config
├── seed.js # Seeder script for test data
├── server.js # Entry point
├── .env # MongoDB connection string
└── README.md


---

## 🚀 Features Implemented

### ✅ Part 1: Product & Inventory Creation
- `POST /api/products`  
  Creates a new product and associated inventory record in one go.
- Validates:
  - Required fields
  - SKU uniqueness
  - Inserts inventory with initial quantity

---

### ✅ Part 2: Inventory & Supplier Data Models
- Built models for:
  - `Product`
  - `Inventory`
  - `Warehouse`
  - `Supplier`
  - `ProductSupplier` (relationship)
  - `Bundle` (optional extension)

---

### ✅ Part 3: Low Stock Alert API
- `GET /api/companies/:companyId/alerts/low-stock`
- Returns products across all warehouses of the company **below threshold (e.g., 20)**
- Includes:
  - Product and warehouse info
  - Days until stockout (based on average daily sales)
  - Suggested supplier for replenishment

---

## ⚙️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- dotenv for config
- Nodemon for dev server

---

## 🧪 How to Run Locally

### 1️⃣ Clone Repo

```bash
git clone https://github.com/Sachin3578/stockflow-backend.git
cd stockflow-backend

npm install

MONGO_URI=mongodb://localhost:27017/stockflow
PORT=5000

node seed.js

Start the Server
npm run dev

API Endpoints
+ Create Product with Inventory
  POST /api/products
  {
  "name": "Test Product",
  "sku": "SKU-001",
  "price": 150,
  "warehouseId": "<replace_with_valid_warehouseId>",
  "initialQuantity": 10
}

Low Stock Alerts
GET /api/companies/:companyId/alerts/low-stock
Sample Output
{
  "alerts": [
    {
      "product_id": "...",
      "product_name": "Widget A",
      "sku": "WID-001",
      "warehouse_id": "...",
      "warehouse_name": "Main Warehouse",
      "current_stock": 5,
      "threshold": 20,
      "days_until_stockout": 4,
      "supplier": {
        "id": "...",
        "name": "Supplier Corp",
        "contact_email": "orders@supplier.com"
      }
    }
  ],
  "total_alerts": 1
}

Future Improvements
Authentication using JWT

Pagination and filtering

Swagger API docs

Frontend UI (MERN full-stack)

Real-time alerting

Author
Sachin Gornar
