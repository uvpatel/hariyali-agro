"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowUpDown,
  Boxes,
  Download,
  MoreHorizontal,
  Package,
  PackageCheck,
  PackagePlus,
  Search,
  SlidersHorizontal,
  Sprout,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const inventory = [
  {
    id: 1,
    name: "Hybrid Tomato Seeds",
    sku: "SEED-TOM-001",
    category: "Seeds",
    stock: 145,
    minStock: 50,
    unit: "Packets",
    price: 299,
    supplier: "GreenGrow Seeds",
    warehouse: "Warehouse A",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Organic NPK Fertilizer",
    sku: "FERT-NPK-014",
    category: "Fertilizer",
    stock: 18,
    minStock: 25,
    unit: "Bags",
    price: 850,
    supplier: "AgriLife",
    warehouse: "Warehouse A",
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Neem Oil Pesticide",
    sku: "PEST-NEEM-006",
    category: "Pesticide",
    stock: 0,
    minStock: 20,
    unit: "Bottles",
    price: 450,
    supplier: "BioCrop India",
    warehouse: "Warehouse B",
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Hybrid Cotton Seeds",
    sku: "SEED-COT-011",
    category: "Seeds",
    stock: 82,
    minStock: 30,
    unit: "Packets",
    price: 699,
    supplier: "GreenGrow Seeds",
    warehouse: "Warehouse A",
    status: "In Stock",
  },
  {
    id: 5,
    name: "Drip Irrigation Kit",
    sku: "IRR-DRIP-021",
    category: "Irrigation",
    stock: 31,
    minStock: 15,
    unit: "Kits",
    price: 2499,
    supplier: "AquaFarm",
    warehouse: "Warehouse B",
    status: "In Stock",
  },
  {
    id: 6,
    name: "Vermicompost",
    sku: "FERT-VERM-008",
    category: "Fertilizer",
    stock: 12,
    minStock: 20,
    unit: "Bags",
    price: 399,
    supplier: "Organic Farms",
    warehouse: "Warehouse A",
    status: "Low Stock",
  },
]

const stats = [
  {
    title: "Total Products",
    value: "248",
    description: "Across all categories",
    icon: Boxes,
  },
  {
    title: "Total Stock",
    value: "12,840",
    description: "Available units",
    icon: Package,
  },
  {
    title: "Low Stock",
    value: "18",
    description: "Requires attention",
    icon: AlertTriangle,
  },
  {
    title: "Inventory Value",
    value: "₹18.4L",
    description: "Current stock value",
    icon: PackageCheck,
  },
]

function StockBadge({ status }: { status: string }) {
  if (status === "In Stock") {
    return (
      <Badge
        variant="outline"
        className="border-emerald-200 bg-emerald-50 text-emerald-700"
      >
        In Stock
      </Badge>
    )
  }

  if (status === "Low Stock") {
    return (
      <Badge
        variant="outline"
        className="border-amber-200 bg-amber-50 text-amber-700"
      >
        Low Stock
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="border-red-200 bg-red-50 text-red-700"
    >
      Out of Stock
    </Badge>
  )
}

export default function InventoryPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        category === "all" ||
        item.category.toLowerCase() === category.toLowerCase()

      const matchesStatus =
        status === "all" ||
        item.status.toLowerCase().replaceAll(" ", "-") === status

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, category, status])

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Sprout className="size-4 text-emerald-600" />
              Agro Management
              <span>/</span>
              Inventory
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Inventory
            </h1>

            <p className="mt-1 text-muted-foreground">
              Track products, stock levels, warehouses and suppliers.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Download className="mr-2 size-4" />
              Export
            </Button>

            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <PackagePlus className="mr-2 size-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <Card key={stat.title}>
                <CardContent className="flex items-start justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>

                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50">
                    <Icon className="size-5 text-emerald-700" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stock Alert */}
        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <div className="flex gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <AlertTriangle className="size-5 text-amber-700" />
              </div>

              <div>
                <p className="font-semibold">18 products are running low</p>
                <p className="text-sm text-muted-foreground">
                  Review stock levels and create purchase orders before
                  products become unavailable.
                </p>
              </div>
            </div>

            <Button variant="outline" className="bg-background">
              View Low Stock
            </Button>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <CardTitle>Product Inventory</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage all agro products and their current stock.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative sm:w-[280px]">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    placeholder="Search product or SKU..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "all")}
                >
                  <SelectTrigger className="sm:w-[170px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      All Categories
                    </SelectItem>
                    <SelectItem value="seeds">Seeds</SelectItem>
                    <SelectItem value="fertilizer">
                      Fertilizer
                    </SelectItem>
                    <SelectItem value="pesticide">
                      Pesticide
                    </SelectItem>
                    <SelectItem value="irrigation">
                      Irrigation
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value ?? "all")}
                >
                  <SelectTrigger className="sm:w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in-stock">
                      In Stock
                    </SelectItem>
                    <SelectItem value="low-stock">
                      Low Stock
                    </SelectItem>
                    <SelectItem value="out-of-stock">
                      Out of Stock
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="min-w-[260px]">
                      <Button
                        variant="ghost"
                        className="-ml-3 h-8"
                      >
                        Product
                        <ArrowUpDown className="ml-2 size-3.5" />
                      </Button>
                    </TableHead>

                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="min-w-[150px]">
                      Stock Level
                    </TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[60px]" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredInventory.map((item) => {
                    const stockPercentage =
                      item.stock === 0
                        ? 0
                        : Math.min(
                            (item.stock / Math.max(item.minStock * 3, 1)) *
                              100,
                            100
                          )

                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-lg border bg-muted/30">
                              <Sprout className="size-5 text-emerald-600" />
                            </div>

                            <div>
                              <p className="font-medium">
                                {item.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.sku}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant="secondary">
                            {item.category}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div>
                            <p className="font-semibold">
                              {item.stock}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.unit}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-2">
                            <Progress
                              value={stockPercentage}
                              className="h-1.5"
                            />

                            <p className="text-xs text-muted-foreground">
                              Min. {item.minStock} {item.unit}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell className="font-medium">
                          ₹{item.price.toLocaleString("en-IN")}
                        </TableCell>

                        <TableCell>{item.warehouse}</TableCell>

                        <TableCell>{item.supplier}</TableCell>

                        <TableCell>
                          <StockBadge status={item.status} />
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon"
                                />
                              }
                            >
                              <MoreHorizontal className="size-4" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                View product
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Edit product
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Adjust stock
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Stock history
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col justify-between gap-3 border-t px-6 py-4 sm:flex-row sm:items-center">
              <p className="text-sm text-muted-foreground">
                Showing {filteredInventory.length} of 248 products
              </p>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>

                <Button variant="outline" size="sm">
                  1
                </Button>

                <Button variant="ghost" size="sm">
                  2
                </Button>

                <Button variant="ghost" size="sm">
                  3
                </Button>

                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}