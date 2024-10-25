document.addEventListener("DOMContentLoaded", listar);

enum Provides {
  M = "3m",
  Bauducco = "bauducco",
  Marilan = "marilan",
  Visconti = "visconti",
  Linea = "linea",
  Nissin = "nissin",
  Colgate = "colgate",
  Palmolive = "colgate",
  Ferrero = "ferrero",
  LaPastina = "la pastina",
  DonaBenta = "dona benta",
  Sazon = "sazon",
  SCJohnson = "scjohnson",
  Cereser = "cereser",
  Ajinomoto = "ajinomoto"
}

interface InventoryItems {
  id?: string
  product: string,
  quantity: number,
  price: number,
  provide: string
}

document.getElementById("form")?.addEventListener("click", criar);

async function criar(event: Event): Promise<void> {
  event.preventDefault();

  try {
    const productInput = document.getElementById("product") as HTMLInputElement;
    const quantityInput = document.getElementById("quantity") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const provideInput = document.getElementById("provides") as HTMLInputElement;

    const product: string = productInput.value;
    const quantity: number = Number(quantityInput.value);
    const price: number = parseFloat(priceInput.value);
    let provide: string = provideInput.value;
    
    if (/[\d\s]/.test(product) || isNaN(quantity) || quantity <= 0 || quantity > 10000) {
      throw new Error("Dados inválidos!");
    };

    const stock: InventoryItems = {
      product,
      quantity,
      price,
      provide
    }

    await fetch("http://localhost:3000/inventory/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stock)
    });

    
    setTimeout(() => { window.location.reload() }, 500);
  } catch (error) {
    console.error(`Error de dados: ${error}`);
  }
};

async function listar(): Promise<void> {
  try {
    const response: Response = await fetch("http://localhost:3000/inventory");
    const estoque: InventoryItems[] = await response.json();
    const inventoryTable = document.getElementById("estoque") as HTMLDataElement;
    
    // Cabeçalho da tabela com Dados
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

    estoque.forEach((item: InventoryItems) => {
      // Corpo da tabela
      const tbody = document.createElement('tbody');
      tbody.classList.add("TableBody");
      const row = document.createElement('tr');
      row.classList.add("rowTable");
      
      const produtoCell = document.createElement('td');
      produtoCell.textContent = item.product;
      
      const quantidadeCell = document.createElement('td');
      quantidadeCell.textContent = item.quantity.toString();
      
      const precoCell = document.createElement('td');
      precoCell.textContent = item.price.toFixed(2).toString();
      
      const fornecedorCell = document.createElement('td');
      fornecedorCell.textContent = item.provide;
      
      row.append(produtoCell, quantidadeCell, precoCell, fornecedorCell)
      tbody.appendChild(row);
      inventoryTable.append(thead, tbody);
    });
  } catch (error) {
    console.error(`Valores não encontrados: ${error}`);
    setTimeout(() => { window.location.reload() }, 360 * 1000);
  }
};

document.getElementById("update")?.addEventListener('click', alterar);

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

    console.info("Quantidade alterada com sucesso!");
  } catch (error) {
    alert(`Erro ao alterar: ${error}`);
  }
};

document.getElementById("delete")?.addEventListener('click', remover);

async function remover(): Promise<void> {
  try {
    const idInput = document.getElementById("idRemover") as HTMLInputElement;
    const id = idInput.value;

    await fetch(`http://localhost:3000/inventory/product/${id}`, {
      method: "DELETE"
    });

    console.info("Item removido com sucesso!");
  } catch (error) {
    alert(`Erro ao remover item: ${error}`);
  }
};