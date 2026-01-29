import { Store, TrendingUp, Package, FileText, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Revenue", value: "$45,230.00", change: "+12.5%", positive: true },
  { label: "Pending Settlements", value: "$3,450.00", change: "3 pending", positive: null },
  { label: "Products", value: "48", change: "4 low stock", positive: null },
  { label: "Active Invoices", value: "12", change: "$8,200 pending", positive: null },
];

const recentOrders = [
  { id: "ORD001", customer: "John Smith", amount: "$125.00", status: "completed" as const },
  { id: "ORD002", customer: "Jane Doe", amount: "$89.00", status: "pending" as const },
  { id: "ORD003", customer: "ABC Corp", amount: "$450.00", status: "completed" as const },
  { id: "ORD004", customer: "XYZ Ltd", amount: "$1,200.00", status: "processing" as const },
];

const MerchantPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
        <p className="text-muted-foreground">Manage your business and track performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p
                className={`text-sm ${
                  stat.positive === true
                    ? "text-primary"
                    : stat.positive === false
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/products">
          <Card className="hover:border-primary/30 hover:shadow-medium transition-all cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Products</p>
                <p className="text-sm text-muted-foreground">48 items</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/dashboard/invoices">
          <Card className="hover:border-primary/30 hover:shadow-medium transition-all cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Invoices</p>
                <p className="text-sm text-muted-foreground">12 active</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/dashboard/customers">
          <Card className="hover:border-primary/30 hover:shadow-medium transition-all cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Customers</p>
                <p className="text-sm text-muted-foreground">234 total</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Card className="hover:border-primary/30 hover:shadow-medium transition-all cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning-muted flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="font-semibold">Settlements</p>
              <p className="text-sm text-muted-foreground">3 pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Store className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.amount}</p>
                  <Badge
                    variant={
                      order.status === "completed"
                        ? "success"
                        : order.status === "pending"
                        ? "pending"
                        : "info"
                    }
                  >
                    {order.status}
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

export default MerchantPage;
