import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const data = await request.json();
    console.log('Dados recebidos:', data);

    return NextResponse.json({ message: 'Cadastro recebido com sucesso!' });
}