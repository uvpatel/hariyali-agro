import type { Metadata } from "next"
import type { ReactNode } from "react"

import { Geist, Geist_Mono } from "next/font/google"
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"

import "./globals.css"

import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { InvoiceProvider } from "@/context/invoice-context"
import { Button } from "@/components/ui/button"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Hariyali Fertilizer and Agro Center",
  description:
    "We are a leading provider of high-quality fertilizers and agricultural products, dedicated to supporting farmers and promoting sustainable farming practices.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <InvoiceProvider>
              <TooltipProvider>
                <div className="flex min-h-screen flex-col">
                  {/* Header */}
                  <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                      {/* Logo */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold tracking-tight">
                          Hariyali Agro
                        </span>
                      </div>

                      {/* Authentication */}
                      <div className="flex items-center gap-2">
                        <Show when="signed-out">
                          <SignInButton mode="modal">
                            <Button variant="ghost">
                              Sign In
                            </Button>
                          </SignInButton>

                          <SignUpButton mode="modal">
                            <Button>
                              Sign Up
                            </Button>
                          </SignUpButton>
                        </Show>

                        <Show when="signed-in">
                          <UserButton />
                        </Show>
                      </div>
                    </div>
                  </header>

                  {/* Page Content */}
                  <main className="flex-1">
                    {children}
                  </main>
                </div>
              </TooltipProvider>
            </InvoiceProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}