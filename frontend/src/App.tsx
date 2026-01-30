import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import SecurityPage from "./pages/SecurityPage";
import FAQPage from "./pages/FAQPage";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OTPVerification from "./pages/auth/OTPVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import WalletPage from "./pages/dashboard/WalletPage";
import PaymentsPage from "./pages/dashboard/PaymentsPage";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import ReceiptsPage from "./pages/dashboard/ReceiptsPage";
import MerchantPage from "./pages/dashboard/MerchantPage";
import ProductsPage from "./pages/dashboard/ProductsPage";
import InvoicesPage from "./pages/dashboard/InvoicesPage";
import CustomersPage from "./pages/dashboard/CustomersPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<OTPVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="receipts" element={<ReceiptsPage />} />
            <Route path="merchant" element={<MerchantPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
