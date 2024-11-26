enum Prices {
  M = 1.55,
  Bauducco = 3.5,
  Marilan = 2.75,
  Visconti = 3.0,
  Linea = 4.5,
  Nissin = 1.2,
  Colgate = 2.0,
  Palmolive = 2.5,
  Ferrero = 5.0,
  LaPastina = 6.0,
  DonaBenta = 3.8,
  Sazon = 10.8,
  SCJohnson = 7.5,
  Cereser = 25.5,
  Ajinomoto = 4.0
}

interface InventoryItems {
  id?: string
  product: string,
  quantity: number,
  price: keyof typeof Prices | number,
  provide: string
}

document.getElementById("form")?.addEventListener("submit", criar);

async function criar(event: Event): Promise<void> {
  event.preventDefault();

  try {
    const productInput = document.getElementById("product") as HTMLInputElement;
    const quantityInput = document.getElementById("quantity") as HTMLInputElement;
    const provideInput = document.getElementById("provides") as HTMLInputElement;

    const product: string = productInput.value.toUpperCase();
    const quantity: number = Number(quantityInput.value.toUpperCase());
    let provide: keyof typeof Prices = provideInput.value.toUpperCase() as keyof typeof Prices;

    if (/[\d\s]/.test(product) || quantity <= 0 || quantity > 10000) {
      throw new Error("Dados inválidos!");
    };

    const stock: InventoryItems = {
      product: product,
      quantity: quantity,
      price: quantity * Prices[provide],
      provide: provide
    }

    await fetch("http://localhost:3000/inventory/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stock)
    });

    setTimeout(() => { listar() }, 500);
  } catch (error) {
    console.error(`Error de dados: ${error}`);
  }
};

document.addEventListener("DOMContentLoaded", listar);

async function listar(): Promise<any> {
  try {
    const response: Response = await fetch("http://localhost:3000/inventory");
    const stock: InventoryItems[] = await response.json();

    // Seção da Tabela
    const sectionTable = document.getElementById("stock") as HTMLDataElement;
    
    // Corpo da tabela
    const tbody = document.createElement('tbody');
    const row = document.createElement('tr');
    
    stock.forEach((item: InventoryItems) => {
      const productCell = document.createElement('td');
      productCell.textContent = item.product;

      const quantityCell = document.createElement('td');
      quantityCell.textContent = item.quantity.toString();

      const priceCell = document.createElement('td');
      priceCell.textContent = item.price.toString();

      const provideCell = document.createElement('td');
      provideCell.textContent = item.provide;

      row.append(productCell, quantityCell, priceCell, provideCell)
      tbody.appendChild(row);
      sectionTable.append(tbody);
    });

  } catch (error) {
    console.error(`Valores não encontrados: ${error}`);
    setTimeout(() => { window.location.reload() }, 360 * 1000);
  }
};

document.getElementById("update")?.addEventListener('click', alterar);

async function alterar(): Promise<void> {
  try {
    const newValueInput = document.getElementById("newValue") as HTMLInputElement;
    const idInput = document.getElementById("idProduct") as HTMLInputElement;

    const id = idInput.value;
    const option = Number(newValueInput.value);
    const data = '';

    if (!option || isNaN(Number(option)) || Number(option) <= 0) {
      alert("Quantidade inválida!");
      return;
    }

    await fetch(`http://localhost:3000/inventory/product?update=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ option, data })
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

    await fetch(`http://localhost:3000/inventory/product?delete=${id}`, {
      method: "DELETE"
    });

    console.info("Item removido com sucesso!");
  } catch (error) {
    alert(`Erro ao remover item: ${error}`);
  }
};