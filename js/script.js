let itens = {};
let opcao = 0;

function criar() {
  let produto, total;
  let i = 0;

  total = parseInt(prompt("Quantos itens serão adicionados ao estoque:"));

  if (isNaN(total) || total <= 0) {
    alert("Insira um valor válido.");
    return;
  };

  for (; i < total; i++) {
    produto = prompt("Digite o nome do produto:").toUpperCase().trim();
    quantidade = parseFloat(prompt(`Digite a quantidade total de ${produto}:`));
    
    itens[produto] = quantidade;

    alert(`O item ${produto} foi adicionado com ${quantidade} unidades.`);
  };
};

function listar() {};

function remover() {
  listar();

  let remove = prompt("Insira o nome do item a ser removida:").toUpperCase().trim();

  delete itens[remove];

  alert(`O item ${remove} foi removido.`);
};

while (opcao !== 3) {
  opcao = parseInt(prompt("Insira uma opção:\n1. Criar.\n2. Remover.\n3. Sair."));

  switch (opcao) {
    case 1:
      criar();
      break;
    case 2:
      remover();
      break;
    case 3:
      alert("Encerrando.");
      break;
    default:
      alert("Insira um valor válido.");
      break;
  };
};

console.table(itens);