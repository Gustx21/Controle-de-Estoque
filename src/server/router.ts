import { insertProduct, readProducts, updateProduct, deleteProduct } from "../prisma.js";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";

const server = fastify();
server.register(cors, { origin: "*" });

// Validadores de propriedades
type ParamsProductRequest = {
    product: string,
    quantity: number,
    price: number,
    provide: string
}

type IdentifyProductRequest = {
    id: number;
}

interface UpdateProductRequest extends IdentifyProductRequest {
    option: number,
    data: string | number
}

// Insere Dados ao Banco
server.post("/inventory/product", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const inventory = request.body as ParamsProductRequest;
        const { product, quantity, price, provide } = inventory;

        if (!product || !quantity || !price || !provide) {
            reply.status(400).send("Values are mandatory!");
            return;
        }

        await insertProduct(product, quantity, price, provide);

        reply.status(201);
    } catch (error) {
        reply.status(400).send(error);
    }
})

// Consulta os Dados no Banco
server.get("/inventory", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const content = await readProducts();

        if (!content) {
            reply.status(404).send("Not found");
            return;
        }

        reply.status(200).send(content);
    } catch (error) {
        reply.status(400).send(error);
    }
})

// Atualiza Dados dentro do Banco
server.put("/inventory/product?update=:id", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { id } = request.params as IdentifyProductRequest;
        const { option, data } = request.body as UpdateProductRequest;

        if (!id) {
            reply.status(400).send("Id invalid!");
            return;
        }

        await updateProduct(Number(id), option, data);

        reply.status(200).send("Update product sucefull");
    } catch (error) {
        reply.status(304).send(error);
    }
})

// Deleta Dados dentro do Banco
server.delete("/inventory/product?delete=:id", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const { id } = request.params as IdentifyProductRequest;
        const productId = Number(id);

        if (!productId) {
            reply.status(404).send("Product Not Found");
            return;
        }

        await deleteProduct(productId);

        reply.status(202);
    } catch (error) {
        reply.status(500).send(error);
    }
})

server.listen({ port: 3000, host: "localhost" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});