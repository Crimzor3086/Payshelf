import { useState } from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Package,
  CreditCard,
  ChevronRight,
} from "lucide-react";

type Notification = {
  id: string;
  type: "transaction" | "stock" | "system" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
  status?: "success" | "pending" | "warning" | "error";
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "transaction",
    title: "Payment Received",
    message: "You received $250.00 from John Doe",
    time: "2 minutes ago",
    read: false,
    status: "success",
  },
  {
    id: "2",
    type: "stock",
    title: "Low Stock Alert",
    message: "Leather Wallet - Brown is running low (8 remaining)",
    time: "1 hour ago",
    read: false,
    status: "warning",
  },
  {
    id: "3",
    type: "transaction",
    title: "Payment Pending",
    message: "Your transfer of $1,200.00 to ABC Corp is processing",
    time: "3 hours ago",
    read: false,
    status: "pending",
  },
  {
    id: "4",
    type: "stock",
    title: "Out of Stock",
    message: "Smart Watch Series 5 is now out of stock",
    time: "Yesterday",
    read: true,
    status: "error",
  },
  {
    id: "5",
    type: "transaction",
    title: "Refund Failed",
    message: "Refund for Order #4489 could not be processed",
    time: "Yesterday",
    read: true,
    status: "error",
  },
  {
    id: "6",
    type: "system",
    title: "Security Update",
    message: "Your account security settings have been updated",
    time: "2 days ago",
    read: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "transaction":
      return CreditCard;
    case "stock":
      return Package;
    case "alert":
      return AlertTriangle;
    default:
      return Bell;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 bg-background border-b border-border z-30">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount} unread
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary font-medium hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="p-4 md:p-6">
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                        notification.status === "success"
                          ? "bg-success-muted"
                          : notification.status === "warning"
                          ? "bg-warning-muted"
                          : notification.status === "error"
                          ? "bg-destructive-muted"
                          : notification.status === "pending"
                          ? "bg-pending-muted"
                          : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          notification.status === "success"
                            ? "text-success"
                            : notification.status === "warning"
                            ? "text-warning"
                            : notification.status === "error"
                            ? "text-destructive"
                            : notification.status === "pending"
                            ? "text-pending"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p
                            className={`font-medium ${
                              !notification.read ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                        {notification.status && (
                          <StatusBadge status={notification.status}>
                            {notification.status.charAt(0).toUpperCase() +
                              notification.status.slice(1)}
                          </StatusBadge>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </main>
    </div>
  );
}
