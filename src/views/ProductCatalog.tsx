import * as React from "react";
import { Eye, Plus, Edit, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  {
    id: 1,
    name: "Llave para Lavadora 1/2",
    brand: "Trupers",
    price: 50.0,
    stock: 50,
    image: "https://picsum.photos/200?random=1",
    status: "En stock",
  },
  {
    id: 2,
    name: "Cemento Sol Portland Tipo II 42.5 kg",
    brand: "SOL",
    price: 30.0,
    stock: 5,
    image: "https://picsum.photos/200?random=2",
    status: "En stock",
  },
  {
    id: 3,
    name: "Cemento Andino Tipo III",
    brand: "Andino",
    price: 26.0,
    stock: 20,
    image: "https://picsum.photos/200?random=3",
    status: "En stock",
  },
  {
    id: 4,
    name: "Pintura Látex Mate Pato Azul 1GL",
    brand: "Patos",
    price: 27.0,
    stock: 0,
    image: "https://picsum.photos/200?random=4",
    status: "Agotado",
  },
];

const categories = [
  {
    name: "Techos y aislantes",
    subcategories: ["Tejas", "Aislantes térmicos", "Láminas"],
  },
  {
    name: "Puertas y ventanas",
    subcategories: [
      "Ventanas de aluminio",
      "Puertas de interior",
      "Puertas de exterior",
      "Puertas plegables",
      "Marcos de puerta",
    ],
  },
  {
    name: "Pinturas",
    subcategories: ["Látex", "Esmalte", "Barniz", "Anticorrosivo"],
  },
  {
    name: "Gasfitería",
    subcategories: ["Tuberías", "Llaves", "Válvulas", "Conexiones"],
  },
  {
    name: "Electricidad",
    subcategories: ["Cables", "Interruptores", "Tomacorrientes", "Tableros"],
  },
  {
    name: "Construcción",
    subcategories: ["Cemento", "Arena", "Ladrillos", "Fierros"],
  },
];

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSubcategory, setSelectedSubcategory] = React.useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-between">
                Categorías <ChevronRight className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="start">
              {categories.map((category) => (
                <DropdownMenuSub key={category.name}>
                  <DropdownMenuSubTrigger className="justify-between">
                    {category.name}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {category.subcategories.map((subcategory) => (
                      <DropdownMenuItem
                        key={subcategory}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setSelectedSubcategory(subcategory);
                        }}
                      >
                        {subcategory}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative flex-1">
            <Input placeholder="Buscar..." className="pl-10" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {(selectedCategory || selectedSubcategory) && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Filtros:</span>
          {selectedCategory && (
            <Badge variant="secondary" className="bg-indigo-100">
              {selectedCategory}
            </Badge>
          )}
          {selectedSubcategory && (
            <Badge variant="secondary" className="bg-indigo-100">
              {selectedSubcategory}
            </Badge>
          )}
        </div>
      )}

      <div className="text-sm text-gray-500">
        Resultado: {products.length} productos
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <Badge
                className="absolute left-2 top-2 bg-indigo-600"
                variant="secondary"
              >
                {product.brand}
              </Badge>
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="text-2xl font-bold">
                    S/ {product.price.toFixed(2)}
                  </div>
                </div>
                <Badge
                  variant={
                    product.status === "En stock" ? "success" : "destructive"
                  }
                >
                  {product.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">
                Stock {product.stock} ud.
              </div>
              <div className="flex items-center justify-between gap-2 pt-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={product.stock === 0}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" className="h-8 w-8 p-0" disabled>
          1
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0">
          2
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0">
          3
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0">
          ...
        </Button>
      </div>
    </div>
  );
}
