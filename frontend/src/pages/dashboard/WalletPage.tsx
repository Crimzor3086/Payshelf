import { ArrowUpRight, ArrowDownLeft, Plus, Building, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentActivity = [
  { id: 1, type: "credit", description: "Payment received from ABC Corp", amount: "+$1,250.00", date: "Today" },
  { id: 2, type: "debit", description: "Withdrawal to Bank Account", amount: "-$2,000.00", date: "Yesterday" },
  { id: 3, type: "credit", description: "Invoice #1234 paid", amount: "+$890.00", date: "Jan 26" },
  { id: 4, type: "credit", description: "Payment from customer", amount: "+$450.00", date: "Jan 25" },
];

const WalletPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view balance details.</p>
      </div>

      {/* Balance Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Balance */}
        <Card className="wallet-card lg:col-span-2">
          <CardContent className="p-0">
            <div>
              <p className="text-primary-foreground/70 text-sm mb-1">Available Balance</p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">$24,580.00</h2>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Funds
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <ArrowUpRight className="h-5 w-5 mr-2" />
                  Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-success-muted flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold amount-positive">+$8,430.00</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Building className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="text-2xl font-bold amount-pending">$890.00</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Linked Accounts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Linked Bank Accounts</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Chase Bank</p>
                  <p className="text-sm text-muted-foreground">****4589 • Checking</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Bank of America</p>
                  <p className="text-sm text-muted-foreground">****7823 • Savings</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "credit" ? "bg-success-muted" : "bg-muted"
                    }`}
                  >
                    {activity.type === "credit" ? (
                      <ArrowDownLeft className="h-5 w-5 text-primary" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    activity.type === "credit" ? "amount-positive" : ""
                  }`}
                >
                  {activity.amount}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;
