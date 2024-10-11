import Link from "next/link";
import axios from "axios";
async function getUsuarios(){
    const url="https://jsonplaceholder.typicode.com/users";
    const usuarios=await axios.get(url);
    //console.log(usuarios.data);
    return(usuarios.data);
}
export default async function Usuarios(){
    const usuarios=await getUsuarios();
    return(
        <>
        <h1>Usuarios</h1>
            <table  className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuarios,i)=>(
                            <tr key="{i}">
                                <td>{i+1}</td>
                                <td>
                                    <Link href={`/usuarios/${usuarios.id}`}>
                                    {usuarios.name}
                                    </Link>
                                </td>
                                <td>{usuarios.username}</td>
                                <td>{usuarios.email}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}