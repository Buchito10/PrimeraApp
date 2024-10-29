import CancelarVenta from "@/components/cancelarVenta";
import Link from "next/link"; // Asegúrate de importar Link para la navegación
import axios from "axios";

async function getVentas() {
    const url = "http://localhost:3000/mostrarVentas";
    const ventas = await axios.get(url);
    return ventas.data;
}

export default async function Ventas() {
    const ventas = await getVentas();
    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Id Usuario</th>
                        <th>Id Producto</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Status</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas.map((venta, i) => (
                            <tr key={venta.id}>
                                <td>{i + 1}</td>
                                <td>{venta.idUsuario}</td>
                                <td>{venta.idProducto}</td>
                                <td>{venta.fecha}</td>
                                <td>{venta.hora}</td>
                                <td>{venta.status}</td>
                                <td>
                                    <CancelarVenta id={venta.id} />
                                    <Link href={`src/components/editarVenta/${venta.id}`}>
                                        <button className="btn btn-secondary">Editar</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}