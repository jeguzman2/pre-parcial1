import { useEffect, useState } from "react";
import Link from "next/link";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/authors")
      .then(res => res.json())
      .then(data => setAuthors(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = confirm("¿Seguro que deseas eliminar este autor?");
  
  if (!confirmDelete) return;

  await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
    method: "DELETE"
  });

  setAuthors(authors.filter(a => a.id !== id));
};


  return (
    <div>
      <h1>Lista de Autores</h1>

      <Link href="/crear">
        <button>Crear Autor</button>
      </Link>

      {authors.map(author => (
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