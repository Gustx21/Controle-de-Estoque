interface InventoryItems {
  id?: string
  product: string,
  quantity: number,
  price: number,
  provides: string
}

document.getElementById("form")?.addEventListener("submit", criar);
listar();
document.getElementById("")?.addEventListener("click", alterar);
document.getElementById("")?.addEventListener("click", remover);

async function criar(): Promise<void> {
  try {
    const productInput = document.getElementById("product") as HTMLInputElement;
    const quantityInput = document.getElementById("quantity") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const provideInput = document.getElementById("provides") as HTMLInputElement;

    const product: string = productInput.value;
    const quantity: number = Number(quantityInput.value);
    const price: number = Number(priceInput.value);
    let provides: string = provideInput.value;

    if (/[\d\s\W]/.test(product) || isNaN(quantity) || quantity <= 0 || quantity > 10000) {
      throw new Error("Dados inválidos!");
    };

    const estoque: InventoryItems = {
      product,
      quantity,
      price,
      provides
    };

    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estoque)
    });

    setTimeout(() => { listar() }, 2000);
  } catch (error) {
    alert(`Error de dados: ${error}`);
  }
};

async function listar(): Promise<void> {
  try {
    const response: Response = await fetch("http://localhost:3000/inventory");
    const estoque: InventoryItems[] = await response.json();
    const inventoryTable = document.getElementById("estoque") as HTMLDataElement;

    estoque.forEach((item: InventoryItems) => {
      // Criar o cabeçalho
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

      // Criar o corpo da tabela
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
  } catch (error) {
    alert(`Valores não encontrados: ${error}`);
  }
};

async function alterar(): Promise<void> {
  try {
    const newQuantityInput = document.getElementById("newQuantity") as HTMLInputElement;
    const idInput = document.getElementById("idProduct") as HTMLInputElement;

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
  } catch (error) {
    alert(`Erro ao alterar: ${error}`);
  }
};

async function remover(): Promise<void> {
  try {
    const idInput = document.getElementById("idRemover") as HTMLInputElement;
    const id = idInput.value;

    await fetch(`http://localhost:3000/inventory/product/${id}`, {
      method: "DELETE"
    });

    alert("Item removido com sucesso!");
  } catch (error) {
    alert(`Erro ao remover item: ${error}`);
  }
};