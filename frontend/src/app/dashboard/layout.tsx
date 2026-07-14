import type { Metadata } from "next"

import { AppHeader } from "@/components/dashboard/app-header"

export const metadata: Metadata = {
  title: "Analyze MRI",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="flex-1 bg-muted/20">{children}</main>
    </div>
  )
}
