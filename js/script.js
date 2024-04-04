let opcao = 0, estoque = [];

function criar() {
  let produto = prompt("Digite o nome do produto:").toUpperCase().trim();
  
  // Corrigindo mensagem de erro para valores numéricos ou vazios
  if (produto === "" || /[0-9]/.test(produto)) {
    alert("Insira um nome válido!");
    return;
  };
  
  let quantidade = parseFloat(prompt(`Digite a quantidade total de ${produto}:`));

  if (isNaN(quantidade) || quantidade <= 0 || quantidade > 1000) {
    alert("Insira um valor válido.");
    return;
  };

  let itens = { produto: produto, quantidade: quantidade };
  estoque.push(itens);

  alert(`O item ${produto} foi adicionado com ${quantidade} unidades.`);
};

function listar() {
  if (estoque.length === 0) {
    alert("O estoque está vazio.");
    return;
  };

  const listarEstoque = estoque.map((item, indice) => {
    return `ID: ${indice + 1} - ${item.produto}: ${item.quantidade} unidades.`
  }).join("\n");

  alert(`Itens no estoque:\n${listarEstoque}`);
};

function alterar() {
  listar();

  if (estoque.length === 0) { return };

  const indice = parseInt(prompt("insira o número do item que deseja alterar.")) - 1;

  if (isNaN(indice) || indice < 0 || indice > estoque.length) {
    alert("Insira um valor válido.");
    return;
  };

  const novaQuantidade = parseInt(prompt(`Insira a nova quantidade para ${estoque[indice].produto}.`));

  estoque[indice].quantidade = novaQuantidade;
  alert(`Item "${estoque[indice].produto}" alterado para ${novaQuantidade}.`);
};

function remover() {
  listar();

  if (estoque.length === 0) { return };

  let remove = parseInt(prompt("Insira o número do item a ser removida:")) - 1;

  if (isNaN(remove) || remove < 0) {
    alert("Insira um valor válido.");
    return;
  };

  const itemRemovido = estoque[remove].produto;
  estoque.splice(remove, 1);

  alert(`O item ${itemRemovido} foi removido.`);
};

while (opcao !== 5) {
  opcao = parseInt(prompt("Insira uma opção:\n1. Criar.\n2. Listar\n3. Alterar.\n4. Remover.\n5. Sair."));

  switch (opcao) {
    case 1:
      criar();
      break;
    case 2:
      listar();
      break;
    case 3:
      alterar();
      break;
    case 4:
      remover();
      break;
    case 5:
      alert("Encerrando.");
      break;
    default:
      alert("Insira um valor válido.");
      break;
  };
};