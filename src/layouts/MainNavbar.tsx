import { Link, Outlet } from "react-router-dom";
import {
  LayoutGrid,
  ShoppingCart,
  Receipt,
  CreditCard,
  // BarChart3,
  // Users,
  // Building2,
  // Settings,
  Sun,
  ShoppingBag,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MainNavbar({ className }: SidebarProps) {
  const menuItems = [
    {
      title: "Home",
      icon: Home,
      to: "/",
    },
    {
      title: "INVENTARIO",
      items: [
        {
          title: "Nuevo producto",
          icon: ShoppingCart,
          to: "/inventory/new-product",
        },
        // {
        //   title: "Catálogo de productos",
        //   icon: ShoppingBag,
        //   to: "/inventory/test",
        // },
      ],
    },
    {
      title: "TRANSACCIONES",
      items: [
        {
          title: "Mis ventas",
          icon: Receipt,
          to: "/sales",
        },
        // {
        //   title: "Mis gastos",
        //   icon: CreditCard,
        //   to: "/expenses",
        // },
      ],
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={cn("hidden lg:flex lg:w-64 lg:flex-col", className)}>
        <div className="flex flex-col gap-2 h-full border-r bg-gray-50/40">
          <div className="flex h-16 items-center gap-2 px-4 border-b">
            <LayoutGrid className="h-6 w-6" />
            <span className="font-semibold">Inspirationic</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid gap-1 px-2">
              {menuItems.map((section, index) => (
                <div key={index} className="grid gap-1">
                  <h4 className="text-sm font-medium px-2 py-2">
                    {section.title}
                  </h4>
                  {section.items ? (
                    section.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    ))
                  ) : (
                    <Link
                      to={section.to}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                    >
                      <section.icon className="h-4 w-4" />
                      {section.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <LayoutGrid className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex h-16 items-center gap-2 px-4 border-b">
              <LayoutGrid className="h-6 w-6" />
              <span className="font-semibold">Inspirationic</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="grid gap-1 px-2">
                {menuItems.map((section, index) => (
                  <div key={index} className="grid gap-1">
                    <h4 className="text-sm font-medium px-2 py-2">
                      {section.title}
                    </h4>
                    {section.items ? (
                      section.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </Link>
                      ))
                    ) : (
                      <Link
                        to={section.to}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                      >
                        <section.icon className="h-4 w-4" />
                        {section.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-gray-50/40 px-6">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  0
                </span>
              </div>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
