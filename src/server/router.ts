import { insertProduct, readProduct, updateProduct, deleteProduct } from "../prisma.js";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { fastifyCors } from "@fastify/cors";

const server = fastify();
server.register(fastifyCors, { origin: "*" });

type InsertProductRequest = {
    product: string,
    quantity: number,
    price: number,
    provide: string
}

type DeleteProductRequest = {
    id: string;
}

interface UpdateProductRequest extends DeleteProductRequest {
    opcao: number,
    data: string | number
}

server.post("/inventory/product/:id", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { product, quantity, price, provide } = request.body as InsertProductRequest;

        if (!product || !quantity || !price || !provide) {
            reply.status(400).send({
                status: 400,
                message: "Values are mandatory!"
            });
            return;
        }

        await insertProduct(product, quantity, price, provide);

        reply.status(201);
    } catch (error) {
        reply.status(400).send(error);
    }
})

server.get("/inventory", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const content = await readProduct();

        if (!content || content.length === 0) {
            reply.status(404).send("Empty stock list!");
            return;
        }

        reply.status(200).send(content);
    } catch (error) {
        reply.status(404).send(error);
    }
})

server.put("/inventory/product/:id/:opcao/:data", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { id, opcao, data } = request.params as UpdateProductRequest;

        if (!id) {
            reply.status(400).send("Id invalid!");
            return;
        }

        await updateProduct(id, opcao, data);

        reply.status(200).send("Update product sucefull");
    } catch (error) {
        reply.status(417).send(error);
    }
})

server.delete("/inventory/product/:id", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { id } = request.params as DeleteProductRequest;

        if (!id) {
            reply.status(400).send("Id invalid!");
            return;
        }

        await deleteProduct(id);

        reply.status(200).send("Delete product sucefull");
    } catch (error) {
        reply.status(417).send(error);
    }
})

server.listen({ port: 3000, host: "localhost" });