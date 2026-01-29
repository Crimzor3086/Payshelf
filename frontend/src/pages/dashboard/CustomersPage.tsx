import { Search, Users, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const customers = [
  { id: 1, name: "John Smith", email: "john@example.com", phone: "+1 555-0101", spent: "$4,250.00", orders: 12 },
  { id: 2, name: "Jane Doe", email: "jane@example.com", phone: "+1 555-0102", spent: "$2,890.00", orders: 8 },
  { id: 3, name: "ABC Corp", email: "billing@abccorp.com", phone: "+1 555-0103", spent: "$15,600.00", orders: 24 },
  { id: 4, name: "XYZ Ltd", email: "accounts@xyz.com", phone: "+1 555-0104", spent: "$8,900.00", orders: 16 },
  { id: 5, name: "Tech Startup", email: "hello@techstartup.io", phone: "+1 555-0105", spent: "$3,200.00", orders: 6 },
  { id: 6, name: "Design Agency", email: "invoice@design.co", phone: "+1 555-0106", spent: "$6,450.00", orders: 10 },
];

const CustomersPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-muted-foreground">View and manage your customer relationships.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">234</p>
              <p className="text-sm text-muted-foreground">Total Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-2xl font-bold">$45,230.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Avg. Order Value</p>
            <p className="text-2xl font-bold">$187.00</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search customers..." className="pl-10" />
      </div>

      {/* Customers List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary-muted text-primary">
                      {customer.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="font-semibold">{customer.spent}</p>
                    <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
