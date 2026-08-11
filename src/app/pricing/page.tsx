import { PricingTable } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h1>

          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Choose the plan that works best for you.
            Upgrade or cancel anytime.
          </p>
        </div>

        {/* Pricing */}
        <div className="w-full">
          <PricingTable />
        </div>
      </div>
    </main>
  );
}