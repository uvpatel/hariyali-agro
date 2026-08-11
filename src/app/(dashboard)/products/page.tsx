"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const productImages = [
  "/products/product-1.jpg",
  "/products/product-2.jpg",
  "/products/product-3.jpg",
  "/products/product-4.jpg",
]

const sizes = ["S", "M", "L", "XL"]

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(productImages[0])
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src={selectedImage}
                alt="Product image"
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />

              <Badge className="absolute left-4 top-4">
                Bestseller
              </Badge>

              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-4 rounded-full"
              >
                <Heart className="size-4" />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                    selectedImage === image
                      ? "border-foreground"
                      : "border-border hover:border-foreground/50"
                  }`}
                >
                  <Image
                    src={image}
                    alt="Product thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Premium Collection
                </p>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Essential Oversized T-Shirt
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="size-4 fill-foreground text-foreground"
                    />
                  ))}
                </div>

                <span className="text-sm text-muted-foreground">
                  4.9 (128 reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold">₹1,499</span>

                <span className="text-lg text-muted-foreground line-through">
                  ₹1,999
                </span>

                <Badge variant="secondary">25% OFF</Badge>
              </div>

              <p className="leading-7 text-muted-foreground">
                A premium everyday essential made from soft, heavyweight cotton.
                Designed with a relaxed oversized fit for effortless comfort and
                modern styling.
              </p>

              <Separator />

              {/* Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Select size</span>

                  <button className="text-sm text-muted-foreground underline underline-offset-4">
                    Size guide
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={
                        selectedSize === size ? "default" : "outline"
                      }
                      onClick={() => setSelectedSize(size)}
                      className="h-11"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <span className="font-medium">Quantity</span>

                <div className="flex w-fit items-center rounded-lg border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                  >
                    <Minus className="size-4" />
                  </Button>

                  <span className="w-10 text-center text-sm font-medium">
                    {quantity}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={increaseQuantity}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>

              {/* CTA */}
              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12"
                >
                  <ShoppingBag className="mr-2 size-4" />
                  Add to cart
                </Button>

                <Button
                  size="lg"
                  className="h-12"
                >
                  Buy now
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid gap-3 rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <Truck className="size-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm font-medium">Free delivery</p>
                    <p className="text-xs text-muted-foreground">
                      On orders above ₹999
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <RotateCcw className="size-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm font-medium">7-day returns</p>
                    <p className="text-xs text-muted-foreground">
                      Easy and hassle-free returns
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm font-medium">Secure checkout</p>
                    <p className="text-xs text-muted-foreground">
                      Protected and encrypted payments
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <Accordion
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="details">
                  <AccordionTrigger>
                    Product details
                  </AccordionTrigger>

                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 100% premium cotton</li>
                      <li>• Heavyweight 240 GSM fabric</li>
                      <li>• Oversized relaxed fit</li>
                      <li>• Ribbed crew neckline</li>
                      <li>• Machine washable</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping">
                  <AccordionTrigger>
                    Shipping & returns
                  </AccordionTrigger>

                  <AccordionContent className="leading-6 text-muted-foreground">
                    Orders are usually dispatched within 1–2 business days.
                    Standard delivery takes approximately 3–7 days depending on
                    your location.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="care">
                  <AccordionTrigger>
                    Care instructions
                  </AccordionTrigger>

                  <AccordionContent className="leading-6 text-muted-foreground">
                    Machine wash cold with similar colors. Do not bleach.
                    Tumble dry on low heat or air dry for best results.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}