import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutGrid,
  ShoppingCart,
  Receipt,
  // CreditCard,
  // Sun,
  ShoppingBag,
  Home,
  Plus,
  Minus,
  // X,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function MainNavbar({ className }: SidebarProps) {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

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
        {
          title: "Catálogo de productos",
          icon: ShoppingBag,
          to: "/inventory/products",
        },
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
      ],
    },
  ];

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[])
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Carrito de Compras</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">
                      Tu carrito está vacío
                    </p>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-4 border-b"
                      >
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            S/ {item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">S/ {cartTotal.toFixed(2)}</span>
                  </div>
                  <Button className="w-full" disabled={cartItems.length === 0}>
                    Proceder al pago
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
