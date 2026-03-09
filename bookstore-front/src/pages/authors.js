import { useEffect, useState } from "react";
import Link from "next/link";

export default function Authors() {
  const [autores, setAuthors] = useState([]);
  const [busqueda,setBusqueda] =  useState(""); 



  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/authors")
      .then(res => res.json())
      .then(data => setAuthors(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = confirm("¿Seguro que deseas eliminar este autor?"); //ESTO ES PAFA EL MENSAJE DE ELIMINAR AUTOR
  
  if (!confirmDelete) return;

  await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
    method: "DELETE"
  });

  setAuthors(autores.filter(a => a.id !== id));
};

const autoresFiltrados = autores.filter(autor =>
  autor.name.toLowerCase().includes(busqueda.toLowerCase())
);



  return (
    <div>
      <h1>Lista de Autores</h1>

      <Link href="/crear">
        <button>Crear Autor</button>
      </Link>

    <h1> Buscar filtrado de autor </h1>

    <input type="text" placeholder = "BUSCAR POR NOMBRE"  style={{margin: "10px 0",padding: "5px",border: "1px solid white",backgroundColor: "white",color: "red"
  }} value = {busqueda} onChange = {e => setBusqueda(e.target.value) } />

    {autoresFiltrados.length === 0 && <p>No se encontraron autores</p>}
      

      {autoresFiltrados.map(author => (
        <div key={author.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h2>{author.name}</h2>
          <p>{author.birthDate}</p>
          <p>{author.description}</p>
          <img src={author.image} width="120" />

          <br />

          <button onClick={() => handleDelete(author.id)}>
            Eliminar
          </button>

            <Link href={`/edit/${author.id}`}>
                <button>Editar</button>
            </Link>
        </div>
      ))}
    </div>
  );}