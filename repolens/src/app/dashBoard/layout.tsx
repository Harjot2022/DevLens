import {
SidebarProvider,
SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/ui/app-sidebar";

export default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
return ( 
<SidebarProvider>

  <AppSidebar />

  <main className="w-full">

    {/* Navbar */}
    <div className=" flex items-center justify-between border-b p-4">

      <SidebarTrigger />

      <h1 className="text-xl font-bold">
        DevLens
      </h1>

    </div>

    {/* Page Content */}
    <div className="p-6">
      {children}
    </div>

  </main>

</SidebarProvider>

)
}
