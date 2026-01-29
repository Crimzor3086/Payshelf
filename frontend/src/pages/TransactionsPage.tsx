import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Download,
  ArrowLeft,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Transaction = {
  id: string;
  reference: string;
  type: "incoming" | "outgoing";
  description: string;
  amount: number;
  status: "success" | "pending" | "error";
  date: string;
  time: string;
  recipient?: string;
  sender?: string;
};

const mockTransactions: Transaction[] = [
  {
    id: "1",
    reference: "TXN-2024-001234",
    type: "incoming",
    description: "Payment from John Doe",
    sender: "John Doe",
    amount: 250.0,
    status: "success",
    date: "Jan 28, 2024",
    time: "2:34 PM",
  },
  {
    id: "2",
    reference: "TXN-2024-001233",
    type: "outgoing",
    description: "Supplier Payment - ABC Corp",
    recipient: "ABC Corp",
    amount: 1200.0,
    status: "pending",
    date: "Jan 28, 2024",
    time: "11:20 AM",
  },
  {
    id: "3",
    reference: "TXN-2024-001232",
    type: "incoming",
    description: "Online Store Sale #4521",
    sender: "Online Store",
    amount: 89.99,
    status: "success",
    date: "Jan 27, 2024",
    time: "6:45 PM",
  },
  {
    id: "4",
    reference: "TXN-2024-001231",
    type: "outgoing",
    description: "Refund - Order #4489",
    recipient: "Customer Refund",
    amount: 45.0,
    status: "error",
    date: "Jan 27, 2024",
    time: "3:12 PM",
  },
  {
    id: "5",
    reference: "TXN-2024-001230",
    type: "incoming",
    description: "Payment from Sarah M.",
    sender: "Sarah M.",
    amount: 175.5,
    status: "success",
    date: "Jan 27, 2024",
    time: "10:30 AM",
  },
  {
    id: "6",
    reference: "TXN-2024-001229",
    type: "outgoing",
    description: "Utility Bill Payment",
    recipient: "City Utilities",
    amount: 342.0,
    status: "success",
    date: "Jan 26, 2024",
    time: "9:15 AM",
  },
  {
    id: "7",
    reference: "TXN-2024-001228",
    type: "incoming",
    description: "Invoice #INV-2024-089",
    sender: "Client Payment",
    amount: 2500.0,
    status: "success",
    date: "Jan 26, 2024",
    time: "2:00 PM",
  },
  {
    id: "8",
    reference: "TXN-2024-001227",
    type: "outgoing",
    description: "Employee Salary",
    recipient: "Payroll",
    amount: 4500.0,
    status: "success",
    date: "Jan 25, 2024",
    time: "12:00 PM",
  },
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || tx.status === statusFilter;
    const matchesType = !typeFilter || tx.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

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
              <h1 className="text-xl font-bold">Transactions</h1>
              <p className="text-sm text-muted-foreground">
                View and manage all transactions
              </p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 md:p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by description or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card"
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 gap-2">
                  <Filter className="h-4 w-4" />
                  {statusFilter ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) : "Status"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("success")}>
                  Success
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("error")}>
                  Failed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 gap-2">
                  {typeFilter === "incoming" ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : typeFilter === "outgoing" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <Calendar className="h-4 w-4" />
                  )}
                  {typeFilter ? typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1) : "Type"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
                <DropdownMenuItem onClick={() => setTypeFilter(null)}>
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("incoming")}>
                  Incoming
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("outgoing")}>
                  Outgoing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="divide-y divide-border">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                        tx.type === "incoming" ? "bg-success-muted" : "bg-muted"
                      }`}
                    >
                      {tx.type === "incoming" ? (
                        <ArrowDownLeft className="h-5 w-5 text-success" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{tx.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {tx.reference}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {tx.date} • {tx.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p
                      className={`font-semibold text-lg ${
                        tx.type === "incoming"
                          ? "text-success"
                          : "text-foreground"
                      }`}
                    >
                      {tx.type === "incoming" ? "+" : "-"}$
                      {tx.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <StatusBadge status={tx.status} className="mt-1">
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </StatusBadge>
                  </div>
                </div>
                
                {/* Download Receipt Button */}
                <div className="mt-3 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Receipt className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </main>
    </div>
  );
}
