"use client"
import Link from "next/link";
import axios from "axios";

export default function CancelarVenta({id}){
async function cancelar(){
    //console.log("Estas en borrar venta"+id);
    const url="http://localhost:3000/cancelarVenta/"+id;
    const respuesta = await axios.delete(url);
    console.log(respuesta);
    window.location.replace("/ventas/mostrarVentas");
    }
    return(
        <Link href="" onClick={cancelar}>Cancelar</Link>
    );
}