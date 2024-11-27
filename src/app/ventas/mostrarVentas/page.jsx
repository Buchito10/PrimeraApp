"use client";
import CancelarVenta from "@/components/cancelarVenta";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    // Cargar ventas con estatus "vendido"
    const cargarVentas = async () => {
        try {
            const url = "http://localhost:3000/mostrarVentas";
            const respuesta = await axios.get(url);
            const ventasFiltradas = respuesta.data.filter((venta) => venta.status === "vendido");
            setVentas(ventasFiltradas);
        } catch (error) {
            console.error("Error cargando ventas:", error);
        }
    };

    // Cargar productos en un arreglo
    const cargarProductos = async () => {
        try {
            const url = "http://localhost:3000/mostrarproductos";
            const respuesta = await axios.get(url);
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    // Cargar usuarios en un arreglo
    const cargarUsuarios = async () => {
        try {
            const url = "http://localhost:3000/";
            const respuesta = await axios.get(url);
            setUsuarios(respuesta.data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    };

    // Cancelar venta
    const cancelarVenta = async (id) => {
        try {
            const url = `http://localhost:3000/cancelarVenta/${id}`;
            await axios.delete(url);
            cargarVentas(); // Actualizar lista de ventas
        } catch (error) {
            console.error("Error cancelando la venta:", error);
        }
    };

    // Obtener el nombre del producto a partir del ID
    const obtenerProducto = (id) => {
        const producto = productos.find((prod) => prod.id === id);
        return producto ? producto.descripcion : "Producto no encontrado";
    };

    // Obtener el nombre del usuario a partir del ID
    const obtenerUsuario = (id) => {
        const usuario = usuarios.find((user) => user.id === id);
        return usuario ? usuario.nombre : "Cliente no encontrado";
    };

    // Cargar datos iniciales
    useEffect(() => {
        cargarVentas();
        cargarProductos();
        cargarUsuarios();
    }, []);

    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Producto</th>
                        <th>Cliente</th>
                        <th>Hora</th>
                        <th>Fecha</th>
                        <th>Estatus</th>
                        <th>Editar</th>
                        <th>Cancelar</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, i) => (
                        <tr key={venta.id}>
                            <td>
                                <Link href={`/ventas/${venta.id}`}>{i + 1}</Link>
                            </td>
                            <td>{obtenerProducto(venta.idProducto)}</td>
                            <td>{obtenerUsuario(venta.idUsuario)}</td>
                            <td>{venta.hora}</td>
                            <td>{venta.fecha}</td>
                            <td>{venta.status}</td>
                            <td>
                                <Link href={`/ventas/editar/${venta.id}`}>Editar</Link>
                            </td>
                            <td>
                                <button
                                    onClick={() => cancelarVenta(venta.id)}
                                    className="btn btn-danger"
                                >
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}