"use client"
import axios from "axios";
async function guardarVenta(e){
    e.preventDefault();
    console.log("Estas en guardarVenta");
    const url="http://localhost:3000/nuevaVenta";
    const datos={
        idUsuario:document.getElementById("idUsuario").value,
        idProducto:document.getElementById("idProducto").value,
        fecha:document.getElementById("fecha").value,
        hora:document.getElementById("hora").value,
    }
    //console.log(datos);
    const respuesta = await axios.post(url,datos);
    window.location.href= "http://localhost:3001/ventas/mostrarVentas";
}
export default function NuevaVenta() {
    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarVenta} className="col-6 mt-5" action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva Venta</h1>
                    </div>
                    <div className="card-body">
                        <input placeholder="Id Usuario" className="form-control mb-3" id="idUsuario" required autoFocus type="text" />
                        <input placeholder="Id Producto" className="form-control mb-3" id="idProducto" required type="text" />
                        <input placeholder="Fecha" className="form-control mb-3" id="fecha" required type="text" />
                        <input placeholder="Hora" className="form-control mb-3" id="hora" required type="text" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary col-12">Guardar nueva venta</button>
                    </div>
                </div>
            </form>
        </div>
    );
}