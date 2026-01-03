import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function POST(request: Request) {
  console.log("Recebendo requisição POST em /api/cadastro");
  try {
    const data = await request.json();
    console.log("Dados recebidos:", data);

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
  } catch (error: any) {
    console.error("ERRO CRÍTICO NA API:", error);
    return NextResponse.json(
      { error: "Erro ao salvar cadastro", details: error.message },
      { status: 500 }
    );
  }
}
