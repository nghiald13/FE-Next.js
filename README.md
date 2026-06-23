# MECSU Frontend

![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NextAuth](https://img.shields.io/badge/Next--Auth-v5_Beta-A123A1?style=for-the-badge&logo=next.js&logoColor=white)

The modern, responsive, and high-performance e-commerce user interface for the MECSU. Built with **Next.js (v16)** and **TypeScript**.

## Getting Started

Follow these steps to set up and run the MECSU Frontend development server locally on your machine.

### Prerequisites

Before installation, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended, fully optimized for modern runtimes)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- Running instance of the [MECSU Backend API](https://github.com/nghiald13/BE-NestJS)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nghiald13/FE-Next.js.git
   cd FE-Next.js
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory of your project:
   ```bash
   touch .env
   ```
   Open the `.env` file and configure your keys according to the provided template:
   ```env
   # Config AuthJS / NextAuth Session Secret
   AUTH_SECRET=RANDOM_SECRET_KEY

   # Config Google OAuth2 Credentials
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Config Server-Side Backend Communication
   BACKEND_URL=http://localhost:8080
   ```

### Running the Application

Manage the application lifecycle using the standard predefined scripts:

* **Development Mode** (Runs local environment with hot-module replacement):
   ```bash
   npm run dev
   ```
   Once running, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

* **Production Build** (Compiles and creates an optimized production-ready bundle):
   ```bash
   npm run build
   ```

* **Production Start** (Launches the server with the pre-compiled build assets):
   ```bash
   npm run start
   ```

---

## 📂 Project Directory Structure

```text
src/
├── app/               # Next.js App Router (Pages, layouts, routes, and API endpoints)
├── components/        # Reusable UI components (Shadcn structures, Carousels, Rich Editors)
├── hooks/             # Custom React Hooks for specialized state handling
├── lib/               # Utility functions, helpers, and configurations (e.g., tailwind-merge configuration)
├── types/             # Shared TypeScript interfaces and type definitions
```

## Related Repositories

- [MECSU Backend (NestJS REST APIs)](https://github.com/nghiald13/BE-NestJS)