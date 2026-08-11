import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { InvoiceProvider } from "@/context/invoice-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hariyali Fertilizer and Agro Center",
  description: " We are a leading provider of high-quality fertilizers and agricultural products, dedicated to supporting farmers and promoting sustainable farming practices. Our mission is to enhance crop yields and improve the livelihoods of farmers through innovative solutions and exceptional customer service.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <ClerkProvider>

            <InvoiceProvider>
              
           
           <TooltipProvider>
           
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            
   
            {children}</TooltipProvider>
             </InvoiceProvider>
               </ClerkProvider>
          </ThemeProvider>
   
        </body>
    </html>
  );
}
