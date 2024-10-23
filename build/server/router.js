import { insertProduct, readProduct, readIdProducts, updateProduct, deleteProduct } from "../prisma.js";
import fastify from "fastify";
import cors from "@fastify/cors";
const server = fastify();
server.register(cors, { origin: "*" });
server.post("/inventory/product", async (request, reply) => {
    try {
        const estoque = request.body;
        const { product, quantity, price, provide } = estoque;
        if (!product || !quantity || !price || !provide) {
            reply.status(400).send("Values are mandatory!");
            return;
        }
        await insertProduct(product, quantity, price, provide);
        reply.status(201);
    }
    catch (error) {
        reply.status(400).send(error);
    }
});
server.get("/inventory", async (request, reply) => {
    try {
        const content = await readProduct();
        if (!content) {
            reply.status(404).send("Not found");
            return;
        }
        reply.status(200).send(content);
    }
    catch (error) {
        reply.status(400).send(error);
    }
});
server.get("/inventory/:id", async (request, reply) => {
    try {
        const { id } = request.params;
        const content = await readIdProducts(id);
        if (!content) {
            reply.status(404).send("Product Not Found");
            return;
        }
        reply.status(200).send(content);
    }
    catch (error) {
        reply.status(400).send(error);
    }
});
server.put("/inventory/product/:id/:opcao/:data", async (request, reply) => {
    try {
        const { id, opcao, data } = request.params;
        if (!id) {
            reply.status(400).send("Id invalid!");
            return;
        }
        await updateProduct(id, opcao, data);
        reply.status(200).send("Update product sucefull");
    }
    catch (error) {
        reply.status(304).send(error);
    }
});
server.delete("/inventory/product/:id", async (request, reply) => {
    try {
        const { id } = request.params;
        const productId = Number(id);
        if (!productId) {
            reply.status(404).send("Product Not Found");
            return;
        }
        await deleteProduct(productId);
        reply.status(202);
    }
    catch (error) {
        reply.status(500).send(error);
    }
});
server.listen({ port: 3000, host: "localhost" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
