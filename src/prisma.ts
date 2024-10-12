import { PrismaClient } from "@prisma/client/extension";
const prisma = new PrismaClient();

async function insertProduct(name: string, quantity: number, value: number, provide: string): Promise<void> {
    await prisma.Products.create({
        data: {
            product: name,
            quantity: quantity,
            price: value,
            provide: provide
        }
    })
}

async function readProduct(): Promise<string> {
    const inventory = await prisma.Products.findMany();

    return inventory;
}

async function readIdProducts(id: string): Promise<string> {
    const productId = await prisma.Products.findMany({
        where: {
            id: id
        }
    });

    return productId;
}

async function updateProduct(id: string, opcao: string | number, data: string | number): Promise<void> {
    let updateData: object = {};

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

    await prisma.Products.update({
        where: { id: id },
        updateData
    })
}

async function deleteProduct(id: string): Promise<void> {
    await prisma.Products.delete({
        where: {
            id: id
        }
    });
}

export { insertProduct, readProduct, readIdProducts, deleteProduct };