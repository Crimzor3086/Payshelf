import { Plus, Search, FileText, Send, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const invoices = [
  { id: "INV-001", customer: "ABC Corp", amount: "$2,500.00", status: "paid" as const, date: "Jan 28, 2024" },
  { id: "INV-002", customer: "XYZ Ltd", amount: "$1,200.00", status: "pending" as const, date: "Jan 27, 2024" },
  { id: "INV-003", customer: "John Smith", amount: "$450.00", status: "pending" as const, date: "Jan 26, 2024" },
  { id: "INV-004", customer: "Jane Doe", amount: "$890.00", status: "overdue" as const, date: "Jan 20, 2024" },
  { id: "INV-005", customer: "Tech Corp", amount: "$3,200.00", status: "paid" as const, date: "Jan 18, 2024" },
  { id: "INV-006", customer: "Startup Inc", amount: "$750.00", status: "draft" as const, date: "Jan 15, 2024" },
];

const InvoicesPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Invoices & Payment Links</h1>
          <p className="text-muted-foreground">Create and manage invoices for your customers.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Outstanding</p>
            <p className="text-2xl font-bold">$8,200.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Paid This Month</p>
            <p className="text-2xl font-bold amount-positive">$12,450.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold amount-pending">$1,650.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Overdue</p>
            <p className="text-2xl font-bold amount-negative">$890.00</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search invoices..." className="pl-10" />
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.customer}</p>
                    <p className="text-sm text-muted-foreground">{invoice.id} • {invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{invoice.amount}</p>
                    <Badge
                      variant={
                        invoice.status === "paid"
                          ? "success"
                          : invoice.status === "pending"
                          ? "pending"
                          : invoice.status === "overdue"
                          ? "failed"
                          : "outline"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" title="Send Invoice">
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Copy Link">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicesPage;
