let itens;
let estoque = [];
let opcao = 0;

function criar() {
  let produto, total;

  produto = prompt("Digite o nome do produto:").toUpperCase().trim();
  quantidade = parseFloat(prompt(`Digite a quantidade total de ${produto}:`));

  if (isNaN(quantidade) || quantidade <= 0) {
    alert("Insira um valor válido.");
    return;
  };

  itens = { produto, quantidade }
  estoque.push(itens);

  alert(`O item ${produto} foi adicionado com ${quantidade} unidades.`);
};

function listar() {
  if (estoque.length === 0) {
    alert("O estoque está vazio.");
    return;
  };

  const listarEstoque = estoque.map(function (item, indice) {
    return `${indice + 1}. ${itens.produto}: ${itens.quantidade} unidades.`
  }).join("\n");

  alert(`Itens no estoque:\n${listarEstoque}`);
};

function remover() {
  listar();

  let remove = prompt("Insira o nome do item a ser removida:").toUpperCase().trim();

  delete itens[remove];

  alert(`O item ${remove} foi removido.`);
};

while (opcao !== 4) {
  opcao = parseInt(prompt("Insira uma opção:\n1. Criar.\n2. Listar\n3. Remover.\n4. Sair."));

  switch (opcao) {
    case 1:
      criar();
      break;
    case 2:
      listar();
      break;
    case 3:
      remover();
      break;
    case 4:
      alert("Encerrando.");
      break;
    default:
      alert("Insira um valor válido.");
      break;
  };
};