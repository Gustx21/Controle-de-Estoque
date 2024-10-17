import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function insertProduct(name, quantity, value, provide) {
    await prisma.product.create({
        data: {
            product: name,
            quantity: quantity,
            price: value,
            provide: provide
        }
    });
}
async function readProduct() {
    const inventory = await prisma.product.findMany();
    console.log(inventory);
    return inventory;
}
async function readIdProducts(id) {
    const productId = await prisma.product.findMany({
        where: {
            id: id
        }
    });
    return productId;
}
async function updateProduct(id, opcao, data) {
    let updateData = {};
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
    });
}
async function deleteProduct(id) {
    await prisma.product.delete({
        where: {
            id: id
        }
    });
}
export { insertProduct, readProduct, readIdProducts, updateProduct, deleteProduct };
