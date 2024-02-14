let pasta = {};
let banco = [];
let opcao = 0;

function criar() {
  let nome, arquivo, total;
  let i = 0;

  pasta = prompt("Insira o nome da pasta").toUpperCase();
  total = parseInt(prompt("Quantos itens serão adicionados:"));

  for (; i < total; i++) {
    nome = prompt("Digite o nome do arquivo:").toUpperCase().trim();
    arquivo = parseFloat(prompt(`Digite a propriedade de ${nome}:`));
    
    pasta[nome] = arquivo;
  };

  banco.push(pasta);
};

function alterar() {
  let valorRemover, totalRemover, substituir;

  valorRemover = parseInt(prompt("Insira a coluna a ser removida:"));
  totalRemover = parseInt(prompt("Insira quantos valores serão removidos:"));
  substituir = prompt("Insira o valor a ser substituído:").toLowerCase();

  banco.splice(valorRemover, totalRemover, substituir);
};

function remover() {
  let remove = prompt("Insira o nome da pasta a ser removida:").toLowerCase();

  delete pasta[remove];
};

while (opcao !== 4) {
  opcao = parseInt(prompt("Insira uma opção:\n1. Criar.\n2. Alterar.\n3. Remover.\n4. Sair."));

  switch (opcao) {
    case 1:
      criar();
      break;
    case 2:
      alterar();
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
console.table(pasta);
console.table(banco);