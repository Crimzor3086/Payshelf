import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, QrCode, Link as LinkIcon, User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentsPage = () => {
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-muted-foreground">Send and receive money securely.</p>
      </div>

      {/* Payment Options */}
      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="send" className="gap-2">
            <ArrowUpRight className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </TabsTrigger>
          <TabsTrigger value="receive" className="gap-2">
            <ArrowDownLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Receive</span>
          </TabsTrigger>
          <TabsTrigger value="qr" className="gap-2">
            <QrCode className="h-4 w-4" />
            <span className="hidden sm:inline">QR Code</span>
          </TabsTrigger>
          <TabsTrigger value="link" className="gap-2">
            <LinkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Link</span>
          </TabsTrigger>
        </TabsList>

        {/* Send Money */}
        <TabsContent value="send" className="mt-6">
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
              <CardDescription>Transfer funds to another user or bank account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="recipient"
                    placeholder="Email, phone, or wallet address"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10 text-2xl font-semibold h-14"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">Available: $24,580.00</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input id="note" placeholder="Add a note for the recipient" />
              </div>

              <Button className="w-full" size="lg">
                Send Money
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receive Money */}
        <TabsContent value="receive" className="mt-6">
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle>Receive Money</CardTitle>
              <CardDescription>Request payment from someone.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from">Request From</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="from"
                    placeholder="Email or phone number"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestAmount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="requestAmount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10 text-2xl font-semibold h-14"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestNote">Note</Label>
                <Input id="requestNote" placeholder="What's this for?" />
              </div>

              <Button className="w-full" size="lg">
                Request Payment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* QR Code */}
        <TabsContent value="qr" className="mt-6">
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle>QR Code Payment</CardTitle>
              <CardDescription>Scan or share your payment QR code.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-square max-w-64 mx-auto bg-muted rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-32 w-32 mx-auto text-foreground/20" />
                  <p className="text-sm text-muted-foreground mt-4">Your payment QR code</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  Scan QR
                </Button>
                <Button className="flex-1">
                  Share QR
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Link */}
        <TabsContent value="link" className="mt-6">
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle>Payment Link</CardTitle>
              <CardDescription>Create a shareable payment link.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkAmount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="linkAmount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10 text-2xl font-semibold h-14"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkDescription">Description</Label>
                <Input id="linkDescription" placeholder="What's this payment for?" />
              </div>

              <Button className="w-full" size="lg">
                <LinkIcon className="h-5 w-5 mr-2" />
                Generate Payment Link
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsPage;
