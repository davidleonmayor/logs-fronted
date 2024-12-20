import { useState } from "react";
import { Navigate } from "react-router-dom";
import DevTree from "../pages/DevTree";
import { ProveedoresData } from "../types/proveedores";

const mockData: ProveedoresData = {
  proveedores: [
    {
      id: "1",
      nombre: "Proveedor A",
      email: "proveedora@example.com",
      telefono: "123-456-7890",
      productos: [
        {
          id: "1",
          nombre: "Producto 1",
          cantidad: 100,
          fechaRecepcion: "2023-05-15",
        },
        {
          id: "2",
          nombre: "Producto 2",
          cantidad: 50,
          fechaRecepcion: "2023-05-14",
        },
      ],
    },
    {
      id: "2",
      nombre: "Proveedor B",
      email: "proveedorb@example.com",
      telefono: "098-765-4321",
      productos: [
        {
          id: "3",
          nombre: "Producto 3",
          cantidad: 75,
          fechaRecepcion: "2023-05-13",
        },
        {
          id: "4",
          nombre: "Producto 4",
          cantidad: 200,
          fechaRecepcion: "2023-05-12",
        },
      ],
    },
  ],
};

const isLoading = false;
const isError = false;

const Loading = (
  <div className="flex items-center justify-center h-screen text-xl font-bold">
    Loading...
  </div>
);

export default function AppLayout() {
  const [data] = useState<ProveedoresData>(mockData);

  if (isLoading) return Loading;
  if (isError) return <Navigate to="/auth/login" />;
  return <DevTree data={data} />;
}
