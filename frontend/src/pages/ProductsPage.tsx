import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Package,
  Edit,
  Trash2,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    sku: "WH-001",
    price: 299.99,
    stock: 45,
    category: "Electronics",
    status: "in-stock",
  },
  {
    id: "2",
    name: "Leather Wallet - Brown",
    sku: "LW-102",
    price: 59.99,
    stock: 8,
    category: "Accessories",
    status: "low-stock",
  },
  {
    id: "3",
    name: "Smart Watch Series 5",
    sku: "SW-005",
    price: 449.99,
    stock: 0,
    category: "Electronics",
    status: "out-of-stock",
  },
  {
    id: "4",
    name: "Running Shoes - Black",
    sku: "RS-200",
    price: 129.99,
    stock: 32,
    category: "Footwear",
    status: "in-stock",
  },
  {
    id: "5",
    name: "Organic Cotton T-Shirt",
    sku: "TS-050",
    price: 34.99,
    stock: 5,
    category: "Apparel",
    status: "low-stock",
  },
  {
    id: "6",
    name: "Stainless Steel Water Bottle",
    sku: "WB-015",
    price: 24.99,
    stock: 78,
    category: "Accessories",
    status: "in-stock",
  },
];

const getStockStatus = (stock: number): "success" | "warning" | "error" => {
  if (stock === 0) return "error";
  if (stock <= 10) return "warning";
  return "success";
};

const getStockLabel = (stock: number): string => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(mockProducts.map((p) => p.category))];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
              <h1 className="text-xl font-bold">Products & Inventory</h1>
              <p className="text-sm text-muted-foreground">
                {mockProducts.length} products
              </p>
            </div>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
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
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 gap-2">
                <Filter className="h-4 w-4" />
                {selectedCategory || "All Categories"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card">
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                All Categories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    SKU
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    Price
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    Stock
                  </th>
                  <th className="text-center p-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {product.sku}
                    </td>
                    <td className="p-4 text-sm">{product.category}</td>
                    <td className="p-4 text-right font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-4 text-right font-medium">
                      {product.stock}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <StatusBadge status={getStockStatus(product.stock)}>
                          {getStockLabel(product.stock)}
                        </StatusBadge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.sku}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.stock} in stock
                    </p>
                  </div>
                  <StatusBadge status={getStockStatus(product.stock)}>
                    {getStockLabel(product.stock)}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
