# PCShop — .NET Core Web API + React (Vite)

**PCShop** is a full-stack web application for managing a computer equipment store.  
It provides role-based access for **administrators** and **employees**, allowing full control over products, categories, employees, and invoices.

## Main Features

- Login and authentication by username and password
- Role-based redirection after login
- Product list with filtering and sorting (by name, price, category)
- CRUD operations for products, categories, and employees
- Invoice creation with item details and total calculation
- Full synchronization with SQL Server database

## Setup Instructions

### Backend

1. Open the backend folder
2. Configure your SQL Server connection in appsettings.json
3. Restore NuGet packages
4. Apply Entity Framework migrations (must be done before running the app)
5. Run the backend

### Frontend

1. Install dependencies
2. Start the development server