export interface Producto {
  id: string;
  nombre: string;
  cantidad: number;
  fechaRecepcion: string;
}

export interface Proveedor {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  productos: Producto[];
}

export interface ProveedoresData {
  proveedores: Proveedor[];
}
