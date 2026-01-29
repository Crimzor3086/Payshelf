import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  History,
  Bell,
  Menu,
  X,
  Plus,
  Search,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  Eye,
  EyeOff,
  Package,
  CreditCard,
  Users,
} from "lucide-react";

type Transaction = {
  id: string;
  type: "incoming" | "outgoing";
  description: string;
  amount: number;
  status: "success" | "pending" | "error";
  date: string;
  time: string;
};

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "incoming",
    description: "Payment from John Doe",
    amount: 250.0,
    status: "success",
    date: "Today",
    time: "2:34 PM",
  },
  {
    id: "2",
    type: "outgoing",
    description: "Supplier Payment",
    amount: 1200.0,
    status: "pending",
    date: "Today",
    time: "11:20 AM",
  },
  {
    id: "3",
    type: "incoming",
    description: "Online Store Sale #4521",
    amount: 89.99,
    status: "success",
    date: "Yesterday",
    time: "6:45 PM",
  },
  {
    id: "4",
    type: "outgoing",
    description: "Refund - Order #4489",
    amount: 45.0,
    status: "error",
    date: "Yesterday",
    time: "3:12 PM",
  },
  {
    id: "5",
    type: "incoming",
    description: "Payment from Sarah M.",
    amount: 175.5,
    status: "success",
    date: "Yesterday",
    time: "10:30 AM",
  },
];

const quickActions = [
  { icon: ArrowUpRight, label: "Send", href: "/send" },
  { icon: ArrowDownLeft, label: "Receive", href: "/receive" },
  { icon: QrCode, label: "Pay", href: "/pay" },
  { icon: History, label: "History", href: "/transactions" },
];

const navItems = [
  { icon: CreditCard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: ArrowUpRight, label: "Payments", href: "/payments" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: History, label: "Transactions", href: "/transactions" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);

  const walletBalance = 24847.5;
  const todayRevenue = 1234.0;
  const todayTransactions = 48;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PS</span>
              </div>
              <span className="text-lg font-bold">PayShelf</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Settings</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">Good morning, Alex</h1>
                <p className="text-sm text-muted-foreground">
                  Here's what's happening with your business
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-pending rounded-full" />
              </button>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6 space-y-6">
          {/* Wallet Card */}
          <div className="wallet-card rounded-2xl p-6 md:p-8 shadow-elevated animate-fade-up">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm opacity-80 mb-1">Available Balance</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {balanceVisible
                      ? `$${walletBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}`
                      : "••••••••"}
                  </h2>
                  <button
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {balanceVisible ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+12.5%</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Funds
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-white text-primary hover:bg-white/90 border-0"
              >
                <ArrowUpRight className="h-5 w-5 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className="grid grid-cols-2 gap-4 animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="bg-card rounded-xl p-5 border border-border shadow-card">
              <p className="text-sm text-muted-foreground mb-1">Today's Revenue</p>
              <p className="text-2xl font-bold text-foreground">
                ${todayRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border shadow-card">
              <p className="text-sm text-muted-foreground mb-1">Transactions</p>
              <p className="text-2xl font-bold text-foreground">{todayTransactions}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all text-center group"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <action.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <Link
                to="/transactions"
                className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
              {/* Search */}
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full h-10 pl-10 pr-4 bg-muted rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Transaction List */}
              <div className="divide-y divide-border">
                {mockTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          tx.type === "incoming"
                            ? "bg-success-muted"
                            : "bg-muted"
                        }`}
                      >
                        {tx.type === "incoming" ? (
                          <ArrowDownLeft
                            className={`h-5 w-5 ${
                              tx.type === "incoming"
                                ? "text-success"
                                : "text-foreground"
                            }`}
                          />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {tx.date} • {tx.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          tx.type === "incoming"
                            ? "text-success"
                            : "text-foreground"
                        }`}
                      >
                        {tx.type === "incoming" ? "+" : "-"}$
                        {tx.amount.toFixed(2)}
                      </p>
                      <StatusBadge status={tx.status} className="text-xs">
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
