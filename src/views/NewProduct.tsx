import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function NewProduct() {
  const [imageUrl, setImageUrl] = React.useState<string>("");

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      sku: "",
      unit: "",
      cost: "",
      utility: "",
      price: "",
      discount: "",
      stock: "",
      minStock: "",
      category: "",
      brand: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 lg:grid-cols-3"
    >
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="productName">Nombre del producto</Label>
            <Input
              {...register("productName", {
                required: "Este campo es obligatorio",
              })}
              placeholder="Nombre del producto"
            />
            <div className="h-5">
              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                {...register("sku", { required: "Este campo es obligatorio" })}
                placeholder="Código único"
              />
              <div className="h-5">
                {errors.sku && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.sku.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unidad de Medida</Label>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unit">Unidad</SelectItem>
                      <SelectItem value="kg">Kilogramo</SelectItem>
                      <SelectItem value="g">Gramo</SelectItem>
                      <SelectItem value="l">Litro</SelectItem>
                      <SelectItem value="ml">Mililitro</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cost">Costo de Adquisición</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  {...register("cost", {
                    required: "Este campo es obligatorio",
                  })}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
              <div className="h-5">
                {errors.cost && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cost.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="utility">Utilidad</Label>
              <Input
                {...register("utility", {
                  required: "Este campo es obligatorio",
                })}
                type="number"
                min="0"
                placeholder="0"
              />
              <div className="h-5">
                {errors.utility && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.utility.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Precio Venta</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  {...register("price", {
                    required: "Este campo es obligatorio",
                  })}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
              <div className="h-5">
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Descuento</Label>
              <div className="relative">
                <Input
                  {...register("discount")}
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  className="pr-7"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
              <div className="h-5">
                {errors.discount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.discount.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                {...register("stock", {
                  required: "Este campo es obligatorio",
                })}
                type="number"
                min="0"
                placeholder="0"
              />
              <div className="h-5">
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="minStock">Stock Mínimo</Label>
              <Input
                {...register("minStock", {
                  required: "Este campo es obligatorio",
                })}
                type="number"
                min="0"
                placeholder="10"
              />
              <div className="h-5">
                {errors.minStock && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.minStock.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Clasificación del Producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "La categoría es requerida" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">
                          Electrónicos
                        </SelectItem>
                        <SelectItem value="clothing">Ropa</SelectItem>
                        <SelectItem value="food">Alimentos</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="h-5">
                      {error && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Controller
                name="brand"
                control={control}
                rules={{ required: "La marca es requerida" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione marca" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brand1">Marca 1</SelectItem>
                        <SelectItem value="brand2">Marca 2</SelectItem>
                        <SelectItem value="brand3">Marca 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="h-5">
                      {error && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagen del Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleImageDrop}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Product preview"
                    className="max-h-[200px] w-full rounded-lg object-contain"
                  />
                ) : (
                  <>
                    <p className="mb-2 text-sm text-red-500">
                      Imagen requerida arrastre y suelte la aquí, o
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      // onClick={handleImageSelect}
                    >
                      Seleccionar
                    </Button>
                    <p className="mt-2 text-xs text-gray-500">
                      Soporta: jpeg, png
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4 lg:col-span-3">
        <Button variant="outline">Descartar</Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
