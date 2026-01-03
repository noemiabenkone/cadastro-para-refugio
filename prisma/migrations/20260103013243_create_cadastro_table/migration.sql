-- CreateTable
CREATE TABLE "Cadastro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sobreNome" TEXT NOT NULL,
    "dataDeNascimento" TEXT NOT NULL,
    "paisDeOrigem" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "nomeDaMae" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
