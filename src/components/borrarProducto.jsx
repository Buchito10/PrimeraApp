"use client"
import Link from "next/link";
import axios from "axios";

export default function BorrarProducto({id}){
async function borrar(){
    //console.log("Estas en borrar producto"+id);
    const url="http://localhost:3000/borrarProducto/"+id;
    const respuesta = await axios.delete(url);
    console.log(respuesta);
    window.location.replace("/productos/mostrarProductos");
    }
    return(
        <Link href="" onClick={borrar}>Borrar</Link>
    );
}