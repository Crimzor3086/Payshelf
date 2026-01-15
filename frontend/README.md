# PayShelf - Retail POS for Africa

A modern retail Point of Sale (POS) platform built for African SMEs with M-Pesa integration.

## Features

- **Point of Sale (POS)**: Fast and intuitive checkout system
- **Inventory Management**: Track stock levels, low stock alerts, and restocking
- **M-Pesa Integration**: Seamless mobile money payments via STK Push
- **Analytics Dashboard**: Real-time sales analytics and insights
- **Customer Loyalty**: Track customer points and rewards
- **JWT Authentication**: Secure user authentication

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Charts**: Recharts
- **Backend**: Node.js + Express + Firebase

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Backend server running (see backend README)

### Installation

```sh
# Step 1: Navigate to the frontend directory
cd frontend

# Step 2: Install dependencies
npm install

# Step 3: Create environment file
cp .env.example .env

# Step 4: Update .env with your backend API URL
# VITE_API_URL=http://localhost:3001

# Step 5: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3001
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and API clients
│   │   └── api/        # API service modules
│   ├── pages/          # Page components
│   └── data/           # Mock data (for development)
├── public/             # Static assets
└── dist/               # Production build output
```

## API Integration

The frontend communicates with the backend API through centralized API clients:

- `lib/api/auth.ts` - Authentication endpoints
- `lib/api/inventory.ts` - Inventory management
- `lib/api/sales.ts` - Sales and payments
- `lib/api/analytics.ts` - Analytics and reports
- `lib/api/loyalty.ts` - Customer loyalty program

All API requests are handled by `lib/api/apiClient.ts` which:
- Automatically attaches JWT tokens
- Handles 401 errors with automatic redirect to login
- Provides consistent error handling

## Authentication

The app uses JWT authentication:
- Tokens are stored in `localStorage`
- Protected routes require valid authentication
- Expired tokens automatically redirect to login

## Deployment

### Build for Production

```sh
npm run build
```

The production build will be in the `dist/` directory.

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set environment variables (`VITE_API_URL`)
3. Deploy

## License

Copyright © 2024 PayShelf
