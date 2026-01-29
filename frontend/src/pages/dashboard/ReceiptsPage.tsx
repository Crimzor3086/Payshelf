import { Search, Download, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const receipts = [
  {
    id: "RCP001",
    title: "Payment Receipt - ABC Corp",
    amount: "$1,250.00",
    date: "Jan 28, 2024",
    type: "Payment Received",
  },
  {
    id: "RCP002",
    title: "Transfer Receipt - John Smith",
    amount: "$500.00",
    date: "Jan 28, 2024",
    type: "Transfer",
  },
  {
    id: "RCP003",
    title: "Invoice Receipt - INV-1234",
    amount: "$890.00",
    date: "Jan 27, 2024",
    type: "Invoice Payment",
  },
  {
    id: "RCP004",
    title: "Subscription Receipt",
    amount: "$29.99",
    date: "Jan 27, 2024",
    type: "Subscription",
  },
  {
    id: "RCP005",
    title: "Payment Receipt - XYZ Ltd",
    amount: "$2,340.00",
    date: "Jan 26, 2024",
    type: "Payment Received",
  },
];

const ReceiptsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Receipts</h1>
        <p className="text-muted-foreground">View, download, and share your transaction receipts.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search receipts..." className="pl-10" />
      </div>

      {/* Receipts Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {receipts.map((receipt) => (
          <Card key={receipt.id} className="hover:shadow-medium transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline">{receipt.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-1">{receipt.title}</h3>
              <p className="text-2xl font-bold mb-2">{receipt.amount}</p>
              <p className="text-sm text-muted-foreground mb-4">{receipt.date}</p>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReceiptsPage;
