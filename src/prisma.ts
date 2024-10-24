import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Inserção de Dados ao Banco
async function insertProduct(name: string, quantity: number, value: number, provide: string): Promise<void> {
    await prisma.product.create({
        data: {
            product: name,
            quantity: quantity,
            price: value,
            provide: provide
        }
    })
}

// Leitura dos Dados do Banco
async function readProduct(): Promise<Object> {
    const inventory = await prisma.product.findMany();

    return inventory;
}

// Leitura específica dos Dados do Banco
async function readIdProducts(id: number): Promise<Object> {
    const productId = await prisma.product.findMany({
        where: {
            id: id
        }
    });

    return productId;
}

// Atualização dos Dados no Banco
async function updateProduct(id: number, opcao: string | number, data: string | number): Promise<void> {
    let updateData: object = {};

    // Erro na opção
    switch (opcao) {
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

    await prisma.product.update({
        where: { id: id },
        data: updateData
    })
}

// Remoção dos Dados no Banco
async function deleteProduct(id: number): Promise<void> {
    await prisma.product.delete({
        where: {
            id: id
        }
    });
}

// Exportação das funções
export { insertProduct, readProduct, readIdProducts, updateProduct, deleteProduct };