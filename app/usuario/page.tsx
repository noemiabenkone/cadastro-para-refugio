"use client";

import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    nome: "",
    sobreNome: "",
    dataDeNascimento: "",
    paisDeOrigem: "",
    cidade: "",
    nomeDaMae: "",
    email: "",
  });

  const [erros, setErros] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function validarCampos() {
    const novosErros: Record<string, string> = {};

    if (!form.nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (!form.sobreNome.trim()) novosErros.sobreNome = "Sobrenome é obrigatório";
    if (!form.dataDeNascimento.trim())
      novosErros.dataDeNascimento = "Data de nascimento é obrigatória";
    if (!form.paisDeOrigem.trim())
      novosErros.paisDeOrigem = "País de origem é obrigatório";
    if (!form.cidade.trim()) novosErros.cidade = "Cidade é obrigatória";
    if (!form.nomeDaMae.trim())
      novosErros.nomeDaMae = "Nome da mãe é obrigatório";
    if (!form.email.trim()) novosErros.email = "Email é obrigatório";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const valido = validarCampos();
  if (!valido) return;

  try {
    const response = await fetch("/api/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Erro na resposta:", text);
      throw new Error(`Erro ${response.status}: ${text}`);
    }

    const resultado = await response.json();
    console.log("Resposta do back:", resultado);

    alert("Cadastro realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Erro ao cadastrar. Verifique o console para mais detalhes.");
  }
}

  const inputClasses =
    "w-full rounded-xl px-4 py-3 text-white placeholder-white/80 bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-fuchsia-500 min-h-screen flex items-center justify-center px-4"
    >
      <div className="flex flex-col bg-fuchsia-700 max-w-md gap-2 p-6 sm:p-8 rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-4">Cadastro Para Refúgio</h1>

        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          className={inputClasses}
        />
        {erros.nome && <p className="text-red-300 text-sm">{erros.nome}</p>}

        <input
          name="sobreNome"
          value={form.sobreNome}
          onChange={handleChange}
          placeholder="Sobrenome"
          className={inputClasses}
        />
        {erros.sobreNome && (
          <p className="text-red-300 text-sm">{erros.sobreNome}</p>
        )}

        <input
          name="dataDeNascimento"
          value={form.dataDeNascimento}
          onChange={handleChange}
          placeholder="Data de nascimento"
          className={inputClasses}
        />
        {erros.dataDeNascimento && (
          <p className="text-red-300 text-sm">{erros.dataDeNascimento}</p>
        )}

        <input
          name="paisDeOrigem"
          value={form.paisDeOrigem}
          onChange={handleChange}
          placeholder="País de origem"
          className={inputClasses}
        />
        {erros.paisDeOrigem && (
          <p className="text-red-300 text-sm">{erros.paisDeOrigem}</p>
        )}

        <input
          name="cidade"
          value={form.cidade}
          onChange={handleChange}
          placeholder="Cidade"
          className={inputClasses}
        />
        {erros.cidade && (
          <p className="text-red-300 text-sm">{erros.cidade}</p>
        )}

        <input
          name="nomeDaMae"
          value={form.nomeDaMae}
          onChange={handleChange}
          placeholder="Nome da mãe"
          className={inputClasses}
        />
        {erros.nomeDaMae && (
          <p className="text-red-300 text-sm">{erros.nomeDaMae}</p>
        )}

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className={inputClasses}
        />
        {erros.email && (
          <p className="text-red-300 text-sm">{erros.email}</p>
        )}

        <button
          type="submit"
          className="mt-4 bg-white text-fuchsia-700 font-bold px-4 py-2 rounded hover:bg-fuchsia-200 transition"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
