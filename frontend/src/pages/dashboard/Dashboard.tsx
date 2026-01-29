import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Link as LinkIcon,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const quickActions = [
  { icon: ArrowUpRight, label: "Send Money", href: "/dashboard/payments" },
  { icon: ArrowDownLeft, label: "Receive", href: "/dashboard/payments" },
  { icon: QrCode, label: "QR Payment", href: "/dashboard/payments" },
  { icon: LinkIcon, label: "Payment Link", href: "/dashboard/invoices" },
];

const recentTransactions = [
  {
    id: 1,
    description: "Payment from ABC Corp",
    amount: "+$1,250.00",
    status: "success" as const,
    date: "Today, 2:30 PM",
    type: "credit",
  },
  {
    id: 2,
    description: "Transfer to John Smith",
    amount: "-$500.00",
    status: "success" as const,
    date: "Today, 11:15 AM",
    type: "debit",
  },
  {
    id: 3,
    description: "Invoice #1234 Payment",
    amount: "+$890.00",
    status: "pending" as const,
    date: "Yesterday, 4:45 PM",
    type: "credit",
  },
  {
    id: 4,
    description: "Subscription Renewal",
    amount: "-$29.99",
    status: "success" as const,
    date: "Yesterday, 9:00 AM",
    type: "debit",
  },
  {
    id: 5,
    description: "Refund - Order #5678",
    amount: "-$75.00",
    status: "failed" as const,
    date: "Jan 25, 2024",
    type: "debit",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, John</h1>
        <p className="text-muted-foreground">Here's what's happening with your account today.</p>
      </div>

      {/* Wallet Card */}
      <Card className="wallet-card">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-primary-foreground/70 text-sm mb-1">Total Balance</p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">$24,580.00</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12.5% this month</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/dashboard/wallet">
                  View Wallet
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/dashboard/payments">
                  Send Money
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions & Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary-muted flex items-center justify-center">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Today's Revenue</span>
                <div className="flex items-center gap-1 text-primary text-sm">
                  <TrendingUp className="h-4 w-4" />
                  +8.2%
                </div>
              </div>
              <p className="text-2xl font-bold amount-positive">+$1,640.00</p>
              <p className="text-xs text-muted-foreground mt-1">12 transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Pending</span>
                <Badge variant="pending">3 pending</Badge>
              </div>
              <p className="text-2xl font-bold amount-pending">$890.00</p>
              <p className="text-xs text-muted-foreground mt-1">Awaiting confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">This Month</span>
                <div className="flex items-center gap-1 text-primary text-sm">
                  <TrendingUp className="h-4 w-4" />
                  +12.5%
                </div>
              </div>
              <p className="text-2xl font-bold">$18,430.00</p>
              <p className="text-xs text-muted-foreground mt-1">vs $16,380 last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Expenses</span>
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <TrendingDown className="h-4 w-4" />
                  -3.1%
                </div>
              </div>
              <p className="text-2xl font-bold amount-negative">-$2,150.00</p>
              <p className="text-xs text-muted-foreground mt-1">8 outgoing transactions</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/transactions" className="gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "credit" ? "bg-success-muted" : "bg-muted"
                    }`}
                  >
                    {tx.type === "credit" ? (
                      <ArrowDownLeft className="h-5 w-5 text-primary" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      tx.type === "credit" ? "amount-positive" : ""
                    }`}
                  >
                    {tx.amount}
                  </p>
                  <Badge
                    variant={
                      tx.status === "success"
                        ? "success"
                        : tx.status === "pending"
                        ? "pending"
                        : "failed"
                    }
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
