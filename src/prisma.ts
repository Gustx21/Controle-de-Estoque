import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Inserção de Dados ao Banco
async function insertProduct(name: string, quantity: number, value: number, provide: string): Promise<void> {
    await prisma.products.create({
        data: {
            product: name,
            quantity: quantity,
            price: value,
            provide: provide
        }
    })
}

// Leitura dos Dados do Banco
async function readProducts(): Promise<Object> {
    const inventory = await prisma.products.findMany();

    return inventory;
}

// Atualização dos Dados no Banco
async function updateProduct(id: number, option: number, data: string | number): Promise<void> {
    let updateData: Record<string, string | number> = {};

    // Erro na opção
    switch (option) {
        case 1:
            updateData = { product: data };
            break;
        case 2:
            updateData = { quantity: data };
            break;
        case 3:
            updateData = { price: data };
            break;
        case 4:
            updateData = { provide: data };
            break;
        default:
            break;
    }

    await prisma.products.update({
        where: { id: id },
        data: updateData
    })
}

// Remoção dos Dados no Banco
async function deleteProduct(id: number): Promise<void> {
    await prisma.products.delete({
        where: {
            id: id
        }
    });
}

// Exportação das funções
export { insertProduct, readProducts, updateProduct, deleteProduct };