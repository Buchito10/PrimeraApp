"use client";
import React, { useState } from "react";
import axios from "axios";

async function registrarVenta(evento) {
    evento.preventDefault();
    const url = "http://localhost:3000/ventas/nuevaVenta";
    const datosVenta = {
        estatus: "vendido",
        fecha: document.getElementById("campoFecha").value,
        hora: document.getElementById("campoHora").value,
        idProducto: document.getElementById("campoProducto").dataset.id, // ID del producto
        idUsuario: document.getElementById("campoCliente").dataset.id, // ID del cliente
    };

    try {
        const respuesta = await axios.post(url, datosVenta);
        if (respuesta.status === 200) {
            window.location.href = "http://localhost:3001/ventas/mostrarVentas";
        }
    } catch (error) {
        console.error("Error al registrar la venta:", error);
    }
}

export default function RegistroVenta() {
    const [listaProductos, setListaProductos] = useState([]);
    const [listaClientes, setListaClientes] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(""); // Nombre del producto
    const [clienteSeleccionado, setClienteSeleccionado] = useState(""); // Nombre del cliente
    const [idProducto, setIdProducto] = useState(""); // ID del producto
    const [idUsuario, setIdUsuario] = useState(""); // ID del cliente

    // Función para buscar productos dinámicamente
    const buscarProductos = async (busqueda) => {
        if (!busqueda) {
            setListaProductos([]);
            return;
        }

        try {
            const respuesta = await axios.get("http://localhost:3000/buscarP", {
                params: { busqueda },
            });
            setListaProductos(respuesta.data);
        } catch (error) {
            console.error("Error al buscar productos:", error);
        }
    };

    // Función para buscar clientes dinámicamente
    const buscarClientes = async (busqueda) => {
        if (!busqueda) {
            setListaClientes([]);
            return;
        }

        try {
            const respuesta = await axios.get("http://localhost:3000/buscar", {
                params: { busqueda },
            });
            setListaClientes(respuesta.data);
        } catch (error) {
            console.error("Error al buscar clientes:", error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={registrarVenta} className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Registrar Venta</h2>
                        </div>
                        <div className="card-body">
                            {/* Campo de Producto */}
                            <input
                                type="text"
                                id="campoProducto"
                                className="form-control mb-3"
                                placeholder="Producto"
                                value={productoSeleccionado}
                                data-id={idProducto}
                                onChange={(e) => {
                                    setProductoSeleccionado(e.target.value);
                                    buscarProductos(e.target.value);
                                }}
                                required
                            />
                            <ul className="list-group">
                                {listaProductos.map((producto) => (
                                    <li
                                        key={producto.id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => {
                                            setProductoSeleccionado(producto.nombre);
                                            setIdProducto(producto.id);
                                            setListaProductos([]);
                                        }}
                                    >
                                        {producto.nombre}
                                    </li>
                                ))}
                            </ul>

                            {/* Campo de Cliente */}
                            <input
                                type="text"
                                id="campoCliente"
                                className="form-control mb-3"
                                placeholder="Cliente"
                                value={clienteSeleccionado}
                                data-id={idUsuario}
                                onChange={(e) => {
                                    setClienteSeleccionado(e.target.value);
                                    buscarClientes(e.target.value);
                                }}
                                required
                            />
                            <ul className="list-group">
                                {listaClientes.map((cliente) => (
                                    <li
                                        key={cliente.id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => {
                                            setClienteSeleccionado(cliente.nombre);
                                            setIdUsuario(cliente.id);
                                            setListaClientes([]);
                                        }}
                                    >
                                        {cliente.nombre}
                                    </li>
                                ))}
                            </ul>

                            {/* Campo de Fecha */}
                            <input
                                type="text"
                                id="campoFecha"
                                className="form-control mb-3"
                                placeholder="Fecha de compra"
                                required
                            />

                            {/* Campo de Hora */}
                            <input
                                type="text"
                                id="campoHora"
                                className="form-control mb-3"
                                placeholder="Hora de compra"
                                required
                            />
                        </div>
                        <div className="card-footer text-center">
                            <button type="submit" className="btn btn-success">
                                Guardar Venta
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}