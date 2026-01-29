import { useState } from "react";
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const transactions = [
  {
    id: "TXN001",
    description: "Payment from ABC Corp",
    amount: "+$1,250.00",
    status: "success" as const,
    date: "Jan 28, 2024 2:30 PM",
    type: "credit",
    reference: "INV-2024-001",
  },
  {
    id: "TXN002",
    description: "Transfer to John Smith",
    amount: "-$500.00",
    status: "success" as const,
    date: "Jan 28, 2024 11:15 AM",
    type: "debit",
    reference: "TRF-2024-089",
  },
  {
    id: "TXN003",
    description: "Invoice #1234 Payment",
    amount: "+$890.00",
    status: "pending" as const,
    date: "Jan 27, 2024 4:45 PM",
    type: "credit",
    reference: "INV-2024-002",
  },
  {
    id: "TXN004",
    description: "Subscription Renewal",
    amount: "-$29.99",
    status: "success" as const,
    date: "Jan 27, 2024 9:00 AM",
    type: "debit",
    reference: "SUB-2024-012",
  },
  {
    id: "TXN005",
    description: "Refund - Order #5678",
    amount: "-$75.00",
    status: "failed" as const,
    date: "Jan 26, 2024 3:20 PM",
    type: "debit",
    reference: "RFD-2024-003",
  },
  {
    id: "TXN006",
    description: "Payment from XYZ Ltd",
    amount: "+$2,340.00",
    status: "success" as const,
    date: "Jan 26, 2024 10:00 AM",
    type: "credit",
    reference: "INV-2024-003",
  },
  {
    id: "TXN007",
    description: "Wire Transfer",
    amount: "-$5,000.00",
    status: "success" as const,
    date: "Jan 25, 2024 2:00 PM",
    type: "debit",
    reference: "WIR-2024-001",
  },
  {
    id: "TXN008",
    description: "Customer Payment",
    amount: "+$450.00",
    status: "success" as const,
    date: "Jan 25, 2024 11:30 AM",
    type: "credit",
    reference: "PAY-2024-045",
  },
];

const TransactionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history.</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credits</SelectItem>
                <SelectItem value="debit">Debits</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span>{tx.reference}</span>
                    </div>
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

export default TransactionsPage;
