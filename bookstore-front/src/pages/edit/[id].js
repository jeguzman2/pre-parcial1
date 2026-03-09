import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EditAuthor() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    if (!id) return;

    fetch(`http://127.0.0.1:8080/api/authors/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name,
          birthDate: data.birthDate,
          description: data.description,
          image: data.image
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    router.push("/authors");
  };

  return (
    <div>
      <h1>Editar Autor</h1>

      <Link href="/authors">
        <button>Volver</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <br />

        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
        />
        <br />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <br />

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}