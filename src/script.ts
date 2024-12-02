enum Prices {
  M = 1.55,
  BAUDUCCO = 3.5,
  MARILAN = 2.75,
  VISCONTI = 3.0,
  LINEA = 4.5,
  NISSIN = 1.2,
  COLGATE = 2.0,
  PALMOLIVE = 2.5,
  FERRERO = 5.0,
  LAPASTINA = 6.0,
  DONABENTA = 3.8,
  SAZON = 10.8,
  SCJOHNSON = 7.5,
  CERESER = 25.5,
  AJINOMOTO = 4.0
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
    const product: string = (document.getElementById("product") as HTMLInputElement).value.toUpperCase();
    const quantity: number = Number((document.getElementById("quantity") as HTMLInputElement).value);
    const provide: keyof typeof Prices = (document.getElementById("provides") as HTMLInputElement).value.toUpperCase() as keyof typeof Prices;

    if (/[\d]/.test(product) || quantity <= 0 || quantity > 10000) {
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

    setTimeout(() => { window.location.reload() }, 500);
  } catch (error) {
    console.error(`Error de dados: ${error}`);
  }
};

document.addEventListener("DOMContentLoaded", consultar);

async function consultar(): Promise<void> {
  try {
    const response: Response = await fetch("http://localhost:3000/inventory");
    const stock: InventoryItems[] = await response.json();

    listar(stock);
  } catch (error) {
    console.error(`Valores não encontrados: ${error}`);
    setTimeout(() => { window.location.reload() }, 360 * 1000);
  }
};

document.getElementById("filters")?.addEventListener("click", filtro);

async function filtro(event: Event) {
  event.preventDefault();

  try {
    const response: Response = await fetch("http://localhost:3000/inventory");
    const stock: InventoryItems[] = await response.json();

    const productQuery: string = (document.getElementById("productQuery") as HTMLInputElement)?.value.toLowerCase().trim();
    const quantityQuery: number = Number((document.getElementById("quantityQuery") as HTMLInputElement)?.value);
    const priceQuery: number = Number((document.getElementById("priceQuery") as HTMLInputElement)?.value);
    const provideQuery: string = (document.getElementById("provideQuery") as HTMLInputElement)?.value.toLowerCase().trim();

    if (!productQuery && !quantityQuery && !priceQuery && !provideQuery) {
      listar(stock);
      return;
    };

    const filters = stock.filter((item) => {
      const matchesProduct = productQuery ? item.product.toLowerCase() === productQuery : true;
      const matchesQuantity = quantityQuery ? item.quantity === quantityQuery : true;
      const matchesPrice = priceQuery ? item.price === priceQuery : true;
      const matchesProvide = provideQuery ? item.provide.toLowerCase() === provideQuery : true;

      return matchesProduct && matchesQuantity && matchesPrice && matchesProvide;
    });

    listar(filters);
  } catch (error) {
    console.error(`Valores não encontrados: ${error}`);
    setTimeout(() => { window.location.reload() }, 360 * 1000);
  }
};

function listar(stock: InventoryItems[]): void {
  // Seção da Tabela
  const sectionTable = document.getElementById("stock") as HTMLDataElement;
  sectionTable.innerHTML = "";

  // Conteúdo da Tabela
  stock.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.product}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
      <td>${item.provide}</td>
    `;

    sectionTable.appendChild(row);
  });
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