"use strict";
var Provides;
(function (Provides) {
    Provides["M"] = "3m";
    Provides["Bauducco"] = "bauducco";
    Provides["Marilan"] = "marilan";
    Provides["Visconti"] = "visconti";
    Provides["Linea"] = "linea";
    Provides["Nissin"] = "nissin";
    Provides["Colgate"] = "colgate";
    Provides["Palmolive"] = "colgate";
    Provides["Ferrero"] = "ferrero";
    Provides["LaPastina"] = "la pastina";
    Provides["DonaBenta"] = "dona benta";
    Provides["Sazon"] = "sazon";
    Provides["SCJohnson"] = "scjohnson";
    Provides["Cereser"] = "cereser";
    Provides["Ajinomoto"] = "ajinomoto";
})(Provides || (Provides = {}));
document.getElementById("form")?.addEventListener("submit", criar);
listar();
async function criar() {
    try {
        const productInput = document.getElementById("product");
        const quantityInput = document.getElementById("quantity");
        const priceInput = document.getElementById("price");
        const provideInput = document.getElementById("provides");
        const product = productInput.value;
        const quantity = Number(quantityInput.value);
        const price = parseFloat(priceInput.value);
        let provide = provideInput.value;
        if (/[\d\s]/.test(product) || isNaN(quantity) || quantity <= 0 || quantity > 10000) {
            throw new Error("Dados inválidos!");
        }
        ;
        const estoque = {
            product,
            quantity,
            price,
            provide
        };
        await fetch("http://localhost:3000/inventory/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(estoque)
        });
        setTimeout(() => { window.location.reload; }, 100);
    }
    catch (error) {
        console.error(`Error de dados: ${error}`);
    }
}
;
async function listar() {
    try {
        const response = await fetch("http://localhost:3000/inventory");
        const estoque = await response.json();
        const inventoryTable = document.getElementById("estoque");
        const thead = document.createElement('thead');
        const thProduct = document.createElement('th');
        const thQuantity = document.createElement('th');
        const thPrice = document.createElement('th');
        const thProvide = document.createElement('th');
        thProduct.textContent = "Produto";
        thQuantity.textContent = "Quantidade";
        thPrice.textContent = "Preço";
        thProvide.textContent = "Fornecedor";
        thead.append(thProduct, thQuantity, thPrice, thProvide);
        estoque.forEach((item) => {
            const tbody = document.createElement('tbody');
            const row = document.createElement('tr');
            const produtoCell = document.createElement('td');
            produtoCell.textContent = item.product;
            const quantidadeCell = document.createElement('td');
            quantidadeCell.textContent = item.quantity.toString();
            const precoCell = document.createElement('td');
            precoCell.textContent = item.price.toFixed(2).toString();
            const fornecedorCell = document.createElement('td');
            fornecedorCell.textContent = item.provide;
            row.append(produtoCell, quantidadeCell, precoCell, fornecedorCell);
            tbody.appendChild(row);
            inventoryTable.append(thead, tbody);
        });
    }
    catch (error) {
        alert(`Valores não encontrados: ${error}`);
    }
}
;
async function alterar() {
    try {
        const newQuantityInput = document.getElementById("newQuantity");
        const idInput = document.getElementById("idProduct");
        const newQuantity = Number(newQuantityInput.value);
        const id = idInput.value;
        if (!newQuantity || isNaN(Number(newQuantity)) || Number(newQuantity) <= 0) {
            alert("Quantity inválida!");
            return;
        }
        await fetch(`http://localhost:3000/inventory/product/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quantity: Number(newQuantity) })
        });
        alert("Quantidade alterada com sucesso!");
    }
    catch (error) {
        alert(`Erro ao alterar: ${error}`);
    }
}
;
async function remover() {
    try {
        const idInput = document.getElementById("idRemover");
        const id = idInput.value;
        await fetch(`http://localhost:3000/inventory/product/${id}`, {
            method: "DELETE"
        });
        alert("Item removido com sucesso!");
    }
    catch (error) {
        alert(`Erro ao remover item: ${error}`);
    }
}
;
