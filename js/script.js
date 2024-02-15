let itens = {};
let opcao = 0;

function criar() {
  let nome, total;
  let i = 0;

  total = parseInt(prompt("Quantos itens serão adicionados:"));

  for (; i < total; i++) {
    nome = prompt("Digite o nome do produto:").toUpperCase().trim();
    quantidade = parseFloat(prompt(`Digite a quantidade total de ${nome}:`));
    
    itens[nome] = quantidade;
  };
};

function remover() {
  let remove = prompt("Insira o nome da pasta a ser removida:").toUpperCase();

  delete itens[remove];
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