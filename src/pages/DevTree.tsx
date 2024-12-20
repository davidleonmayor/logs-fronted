"use client";

import { useState } from "react";
import { ProveedoresData, Proveedor, Producto } from "../types/proveedores";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Phone, Mail } from "lucide-react";

interface DevTreeProps {
  data: ProveedoresData;
}

export default function DevTree({ data }: DevTreeProps) {
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(
    null
  );
  const [displayedProducts, setDisplayedProducts] = useState<Producto[]>([]);

  const handleProveedorClick = (proveedor: Proveedor) => {
    setSelectedProveedor(proveedor);
    setDisplayedProducts(proveedor.productos.slice(0, 5));
  };

  const loadMoreProducts = () => {
    if (selectedProveedor) {
      const currentLength = displayedProducts.length;
      const newProducts = selectedProveedor.productos.slice(
        currentLength,
        currentLength + 5
      );
      setDisplayedProducts([...displayedProducts, ...newProducts]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Gestión de Proveedores y Productos
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Proveedores</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {data.proveedores.map((proveedor) => (
                <Button
                  key={proveedor.id}
                  variant={
                    selectedProveedor?.id === proveedor.id
                      ? "secondary"
                      : "ghost"
                  }
                  className="w-full justify-start mb-2"
                  onClick={() => handleProveedorClick(proveedor)}
                >
                  {proveedor.nombre}
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Proveedor y Productos</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedProveedor ? (
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {selectedProveedor.nombre}
                </h2>
                <p className="flex items-center mb-1">
                  <Mail className="mr-2" size={16} /> {selectedProveedor.email}
                </p>
                <p className="flex items-center mb-4">
                  <Phone className="mr-2" size={16} />{" "}
                  {selectedProveedor.telefono}
                </p>
                <h3 className="text-xl font-semibold mb-2">
                  Productos Recibidos
                </h3>
                <ScrollArea className="h-[calc(100vh-350px)]">
                  {displayedProducts.map((producto) => (
                    <Card key={producto.id} className="mb-2">
                      <CardContent className="p-4">
                        <p className="font-semibold">{producto.nombre}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Fecha de recepción: {producto.fechaRecepcion}</p>
                      </CardContent>
                    </Card>
                  ))}
                  {displayedProducts.length <
                    selectedProveedor.productos.length && (
                    <Button onClick={loadMoreProducts} className="w-full mt-2">
                      Cargar más <ChevronDown className="ml-2" size={16} />
                    </Button>
                  )}
                </ScrollArea>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Seleccione un proveedor para ver sus detalles y productos.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
