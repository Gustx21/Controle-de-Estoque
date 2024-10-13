enum fabricantes {
  bauducco = "bauducco",
  ferrero = "ferrero",
  visconti = "visconti",
  marilan = "marilan",
  nenhum= "nenhum"
}

interface CreatePropriety {
  id?: string
  produto: string,
  quantidade: number,
  preco: number,
  fornecedor: string
}

async function criar(): Promise<void> {
  try {
    const produtoInput = document.getElementById("produto") as HTMLInputElement;
    const quantidadeInput = document.getElementById("quantidade") as HTMLInputElement;
    const precoInput = document.getElementById("preco") as HTMLInputElement;

    const produto: string = produtoInput.value;
    const quantidade: number = Number(quantidadeInput.value);
    const preco: number = Number(precoInput.value);
    let fornecedor: string;

    if (/[\d\s\W]/.test(produto) || isNaN(quantidade) || quantidade <= 0 || quantidade > 10000) {
      throw new Error("Dados inválidos!");
    };

    switch (produto.toLocaleLowerCase()) {
      case "pão":
        fornecedor = fabricantes.bauducco;
        break;
      case "nutella":
        fornecedor = fabricantes.ferrero;
        break;
      default:
        fornecedor = fabricantes.nenhum;
        break;
    }

    const estoque: CreatePropriety = {
      produto,
      quantidade,
      preco,
      fornecedor
    };

    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estoque)
    });
  } catch (error) {
    alert(`Error de dados: ${error}`);
  }
};

async function listar(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/inventory");
    const estoque = await response.json();
    const inventoryTable: HTMLElement | null= document.getElementById("estoque");

    if (estoque.length === 0) {
      throw new Error("O estoque está vazio.");
    };

    estoque.forEarch((item: CreatePropriety) => {
      const row = document.createElement("div");
      row.innerHTML = `ID: ${item.id} - ${item.produto}: ${item.quantidade} unidades. Fornecedor: ${item.fornecedor}`;
      inventoryTable?.appendChild(row);
    });
  } catch (error) {
    alert(`Valores não encontrados: ${error}`);
  }
};

async function alterar(): Promise<void> {
  try {
    const novaQuantidade = 2;
    const id = 2;

    if (!novaQuantidade || isNaN(Number(novaQuantidade)) || Number(novaQuantidade) <= 0) {
      alert("Quantidade inválida!");
      return;
    }

    await fetch(`http://localhost:3000/inventory/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quantidade: Number(novaQuantidade) })
    });

    alert("Quantidade alterada com sucesso!");
  } catch (error) {
    alert(`Erro ao alterar: ${error}`);
  }
};

async function remover(id: string): Promise<void> {
  try {
    await fetch(`http://localhost:3000/inventory/product/${id}`, {
      method: "DELETE"
    });

    alert("Item removido com sucesso!");
  } catch (error) {
    alert(`Erro ao remover item: ${error}`);
  }
};