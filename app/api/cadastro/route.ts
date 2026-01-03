import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const cadastro = await prisma.cadastro.create({
      data: {
        nome: data.nome,
        sobreNome: data.sobreNome,
        dataDeNascimento: data.dataDeNascimento,
        paisDeOrigem: data.paisDeOrigem,
        cidade: data.cidade,
        nomeDaMae: data.nomeDaMae,
        email: data.email,
      },
    });

    return NextResponse.json(cadastro, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao salvar cadastro" },
      { status: 500 }
    );
  }
}
