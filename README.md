# Minimal Library Management System – Frontend

This is the **frontend** of the Minimal Library Management System built with **React**, **TypeScript**, **Redux Toolkit Query**, and **Tailwind CSS** using **Shancn UI**. The app allows users to manage books and track borrowed books in a simple, clean, and responsive interface.

---

## Features

✅ View all books in a table with filters, sort and pagination  
✅ Add, edit, and delete books  
✅ Borrow books with quantity and due date validation  
✅ Borrow summary page showing total borrowed quantities  
✅ Real-time UI updates using RTK Query cache  
✅ Skeleton loaders during data fetching  
✅ Toasts and modal dialogs for better UX  
✅ Fully responsive and mobile-friendly layout  
✅ Clean codebase with modular structure

---

## Tech Stack

| Layer            | Technology                      |
| ---------------- | ------------------------------- |
| Frontend         | React + Vite + TypeScript       |
| State Management | Redux Toolkit + RTK Query       |
| Styling          | Tailwind CSS                    |
| Form Handling    | React Hook Form                 |
| Notifications    | SweetAlert2, React Hot Toast    |
| Animations       | Framer Motion                   |
| Icons            | Lucide React, React Icons       |
| Date Handling    | Date-fns                        |
| UI Components    | Shadcn U (Dialog, Select, etc.) |

---

## Folder Structure

```

src/
├── assets/              # Static files (images, logos)
├── components/          # Reusable components
│   ├── pages/           # Page-specific components
│   ├── shared/          # Modals, Skeletons, Inputs
│   └── ui/              # Custom UI components (Table, etc.)
├── layouts/             # Layout wrappers (MainLayout.tsx)
├── lib/                 # Utility functions and constants
├── pages/               # Route-level pages
│   ├── allBooks/
│   ├── borrowSummary/
│   ├── createBook/
│   └── home/
├── redux/               # Redux Toolkit store and API setup
│   ├── features/        # Slices and API endpoints
│   └── store.ts         # Configured Redux store
├── routes/              # All app routes and Router.tsx
├── App.tsx              # Main app component
├── main.tsx             # Entry point
├── vite-env.d.ts        # Vite/TS definitions
└── .env.local           # Environment variables

```

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/mshipan/L2B5_Assignment_4_Fontend.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Start the development server

```bash
npm run dev
```

> ✅ Make sure your backend server is running on the defined API URL.

---

## Available Pages

| Route             | Description                         |
| ----------------- | ----------------------------------- |
| `/`               | Home Page                           |
| `/books`          | View, edit, delete, borrow books    |
| `/create-book`    | Form to add a new book              |
| `/borrow-summary` | Borrow summary with quantity totals |

---

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build production bundle  |

---

## Live Demo

- **Frontend:** [https://lmsys-client.vercel.app](#)
- **Backend:** [https://lmsys-server.vercel.app](#)

---

## License

MIT © [Shipan Mallik](https://github.com/mshipan)
