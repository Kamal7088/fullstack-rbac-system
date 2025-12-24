🔐 Full Stack Role-Based Access Control (RBAC) System
📖 Overview

This project is a production-ready Full Stack RBAC (Role-Based Access Control) system designed to manage users, roles, and permissions in a secure and scalable way.

The application demonstrates real-world authorization patterns where:

Users authenticate using secure credentials

Roles define access boundaries

Permissions control fine-grained access to features

UI and API access are strictly permission-driven

This project was developed as part of a Full Stack Developer Internship Assignment and follows industry best practices.

🧩 Key Objectives

Implement secure authentication and authorization

Design a flexible RBAC data model

Enforce permission-based UI and API access

Deliver a clean, responsive admin dashboard

Deploy a full-stack application to production

🛠 Technology Stack
Frontend

Next.js 14 (App Router)

React

TypeScript

Tailwind CSS

Backend

Next.js API Routes

Node.js

JWT-based Authentication

bcrypt for password hashing

Database

PostgreSQL

node-postgres (pg)

Deployment

Vercel (Frontend + API)

PostgreSQL (Production database)

✨ Core Features
🔐 Authentication & Security

User registration and login

Password hashing using bcrypt

JWT-based session handling

Protected routes for authenticated users only

👥 Role Management

Create and manage system roles

Assign permissions to roles

View roles and their assigned permissions

🔑 Permission Management

Create and manage granular permissions
(e.g. can_edit_articles, delete_user, view_reports)

View all permissions

Attach permissions to roles dynamically

👤 User Management

Assign roles to users

View users with their associated roles

Role updates reflect immediately in access control

🎯 Permission-Based Access Control

UI-level protection (menu items and pages hidden based on permissions)

API-level protection (unauthorized requests blocked server-side)

Only Admin users can access:

Users

Roles

Permissions management pages

📊 Admin Dashboard

Centralized dashboard for RBAC administration

Clean, responsive, and user-friendly interface

Built with scalability in mind

🗂 Project Structure
app/
 ├── api/
 │   ├── auth/
 │   ├── roles/
 │   ├── permissions/
 │   ├── user-roles/
 │   └── me/
 ├── auth/
 │   ├── login/
 │   └── register/
 ├── dashboard/
 ├── users/
 ├── roles/
 ├── permissions/
 └── layout.tsx

lib/
 ├── db.ts
 ├── auth.ts
 └── permissions.ts

🔐 Authorization Flow

User logs in → receives JWT

JWT is validated on protected routes

User role is identified

Permissions are resolved from role

Access is granted or denied based on permission checks

🌐 Live Application
👉 https://fullstack-rbac-system-93ox-ndglv9ork.vercel.app
nDeployment Note:
This application uses a locally configured PostgreSQL database for development.
All features work correctly in the local environment with full database support.
In the live deployment, the database is not connected to a cloud PostgreSQL service.
As a result, database-driven features may be limited in production.
The system can be fully enabled by configuring a cloud PostgreSQL databa

🧪 Example Permissions
can_edit_articles
can_delete_users
create_user
delete_user
view_reports
