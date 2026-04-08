# Indo Global School Kishan Nagar, Shadnagar

A premium, modern, and high-performance school website built for **Indo Global School** in Kishan Nagar, Shadnagar, Telangana. This project features a playful Indian school aesthetic, a secure lead management system, and deep database integration.

## 🌟 Key Features

### **Public Website**
- **Premium Design:** Elegant typography using *Playfair Display* and *Inter*, following a "Playful Indian" theme.
- **Responsive Layout:** Mobile-first architecture that works seamlessly across all devices.
- **Hero Admission Form:** Instant lead capture directly from the landing page.
- **Interactive Gallery:** High-quality campus showcase with lightbox functionality.
- **Live Maps:** Embedded Google Maps integrated with the school's precise coordinates.
- **Contact System:** Professional inquiry forms with real-time validation.

### **Admin Dashboard (`/admin`)**
- **Lead Tracking:** Manage admissions and inquiries with a status-driven workflow (`New`, `Called`, `Visited`, `Converted`).
- **Secure Access:** Password-protected dashboard using JWT-based middleware.
- **Real-time Stats:** Instant visibility into total leads, daily signups, and conversion rates.
- **Data Portability:** Export lead data to CSV for offline analysis or school records.
- **Lead Management:** Ability to update statuses and delete records with a single click.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16.2](https://nextjs.org/) (App Router)
- **Frontend Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/) (Modern CSS-first approach)
- **Database:** [Neon PostgreSQL](https://neon.tech/) (Serverless Postgres)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Authentication:** JWT (jose) with secure cookies
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended)
- A Neon PostgreSQL account

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd indoglobal
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"
   JWT_SECRET="your-secret-key"
   ADMIN_PASSWORD="your-admin-password"
   ```

4. **Initialize the Database:**
   Push the schema to your Neon project:
   ```bash
   pnpm db:push
   ```

5. **Run the Development Server:**
   ```bash
   pnpm dev
   ```
   Navigate to `http://localhost:3000`.

## 📜 Available Scripts

- `pnpm dev` – Start the development server.
- `pnpm build` – Build the application for production.
- `pnpm start` – Run the production build.
- `pnpm db:push` – Sync your Drizzle schema with the database.
- `pnpm db:studio` – Launch the Drizzle database explorer UI.

## 📁 Project Structure

```
├── app/                  # Next.js App Router (Pages, Layouts, API)
│   ├── admin/            # Protected Dashboard
│   ├── api/              # Backend endpoints (Auth, Leads)
│   └── login/            # Admin access portal
├── components/           # UI Sections & shadcn/ui primitives
├── data/                 # Legacy JSON storage (Migrated to DB)
├── lib/                  # Shared utilities (DB, Auth, Schema)
├── public/               # Static assets (Logos, Images)
├── styles/               # Global CSS & Tailwind configuration
├── drizzle.config.ts     # Database migration config
└── package.json          # Project dependencies & scripts
```

## 🎨 Theme Details
- **Primary:** Teal/Forest Green (`#2B7F6B`)
- **Secondary:** Vibrant Orange (`#FF8C42`)
- **Accent:** Warm Gold (`#FFB84D`)
- **Typography:** Playfair Display (Headings), Inter (Body)

## 📄 License
This project is private and proprietary to **Indo Global School**.
