"use strict";
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
        const price = Number(priceInput.value);
        let provides = provideInput.value;
        if (/[\d\s\W]/.test(product) || isNaN(quantity) || quantity <= 0 || quantity > 10000) {
            throw new Error("Dados inválidos!");
        }
        ;
        const estoque = {
            product,
            quantity,
            price,
            provides
        };
        await fetch("http://localhost:3000/inventory/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(estoque)
        });
        setTimeout(() => { listar(); }, 2000);
    }
    catch (error) {
        alert(`Error de dados: ${error}`);
    }
}
;
async function listar() {
    try {
        const response = await fetch("http://localhost:3000/inventory");
        const estoque = await response.json();
        const inventoryTable = document.getElementById("estoque");
        estoque.forEach((item) => {
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = ['Produto', 'Quantidade', 'Preço', 'Fornecedor'];
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            inventoryTable.appendChild(thead);
            const tbody = document.createElement('tbody');
            const row = document.createElement('tr');
            const produtoCell = document.createElement('td');
            row.appendChild(produtoCell);
            const quantidadeCell = document.createElement('td');
            quantidadeCell.textContent = item.quantity.toString();
            row.appendChild(quantidadeCell);
            const precoCell = document.createElement('td');
            precoCell.textContent = item.price.toFixed(2).toString();
            row.appendChild(precoCell);
            const fornecedorCell = document.createElement('td');
            fornecedorCell.textContent = item.provides;
            row.appendChild(fornecedorCell);
            tbody.appendChild(row);
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
