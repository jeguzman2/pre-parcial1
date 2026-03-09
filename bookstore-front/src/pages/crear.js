import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Crear() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    description: "",
    image: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.birthDate) {
      setError("Nombre y fecha son obligatorios");
      return;
    }

    await fetch("http://127.0.0.1:8080/api/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    router.push("/authors");
  };

  return (
    <div>
      <h1>Crear Autor</h1>
      <Link href="/authors">
      <button>Volver</button>
    </Link>

    {error && (
      <p role="alert" aria-live="assertive" style={{ color: "red" }}>
        {error}
      </p>
    )}

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
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
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
      />
      <br />

      <input
        type="text"
        name="image"
        placeholder="URL imagen"
        value={form.image}
        onChange={handleChange}
      />
      <br />

      <button type="submit">Guardar</button>
    </form>
    </div>
  );
}