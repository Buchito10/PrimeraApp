import axios from "axios";
async function getUsuario(id) {
    const url = "https://jsonplaceholder.typicode.com/users/${id}";
    const usuario = await axios.get(url);
    return usuario.data;
}
export default async function Usuario({ params }) {
    const usuario = await getUsuario(params.id);  
    return (
        <>
            <h1>Detalles del Usuario</h1>
            <p><strong>Nombre:</strong> {usuario.name}</p>
            <p><strong>Username:</strong> {usuario.username}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Teléfono:</strong> {usuario.phone}</p>
            <p><strong>Sitio web:</strong> {usuario.website}</p>

            <h2>Dirección</h2>
            <p><strong>Calle:</strong> {usuario.address.street}</p>
            <p><strong>Suite:</strong> {usuario.address.suite}</p>
            <p><strong>Ciudad:</strong> {usuario.address.city}</p>
            <p><strong>Código Postal:</strong> {usuario.address.zipcode}</p>
            <p><strong>Geo:</strong> Latitud {usuario.address.geo.lat}, Longitud {usuario.address.geo.lng}</p>

            <h2>Compañía</h2>
            <p><strong>Nombre de la Compañía:</strong> {usuario.company.name}</p>
            <p><strong>Lema:</strong> {usuario.company.catchPhrase}</p>
            <p><strong>Área de Negocio:</strong> {usuario.company.bs}</p>
        </>
    );
}