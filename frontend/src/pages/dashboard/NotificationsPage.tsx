import { Bell, Check, ArrowDownLeft, AlertTriangle, Package, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: 1,
    type: "payment",
    icon: ArrowDownLeft,
    title: "Payment Received",
    message: "You received $1,250.00 from ABC Corp",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    icon: AlertTriangle,
    title: "Low Stock Alert",
    message: "Basic Package is running low on stock (8 units left)",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "invoice",
    icon: FileText,
    title: "Invoice Paid",
    message: "Invoice #INV-001 has been paid by XYZ Ltd",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "payment",
    icon: ArrowDownLeft,
    title: "Payment Received",
    message: "You received $450.00 from John Smith",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "stock",
    icon: Package,
    title: "Stock Updated",
    message: "Premium Widget stock has been replenished",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "alert",
    icon: AlertTriangle,
    title: "Payment Failed",
    message: "Refund for Order #5678 could not be processed",
    time: "2 days ago",
    read: true,
  },
];

const NotificationsPage = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on your account activity.
            {unreadCount > 0 && ` ${unreadCount} unread notifications.`}
          </p>
        </div>
        <Button variant="outline">
          <Check className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-xl transition-colors cursor-pointer ${
                  !notification.read ? "bg-primary-muted/50" : "hover:bg-muted/50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.type === "payment"
                      ? "bg-success-muted"
                      : notification.type === "alert"
                      ? "bg-warning-muted"
                      : "bg-muted"
                  }`}
                >
                  <notification.icon
                    className={`h-5 w-5 ${
                      notification.type === "payment"
                        ? "text-primary"
                        : notification.type === "alert"
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{notification.title}</p>
                    {!notification.read && (
                      <Badge variant="default" className="text-[10px] px-1.5 py-0">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
