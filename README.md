![Ícone](https://img.icons8.com/?size=100&id=vMqgHSToxrJR&format=png&color=ffffff)

# Projeto de Gerenciador de Estoque em TypeScript
 O projeto destina-se a armazenar dados logístico de produtos, quantidades, preço, fornecedor no Banco de Dados a partir de um método de requisição *POST* a API que extrai os dados da requisição e armazena no **Postgres** usando o micro-framework **Prisma**. Também, uma visualição intuitiva dos dados usando o método de requisição *GET*. Além de manipulação intuitiva para remoção e atualização desses dados.

> [!NOTE]
>
> Este projeto foi desenvolvido com foco prático com objetivo de proporcionar uma experiência em programação TypeScript e JavaScript, direcionada a gestão de estoque de produtos. Recomenda-se utilizá-lo como base para aprender e experimentar, mas não necessariamente como uma solução de estoque completa para ambientes de produção.

## Processo
1. Adição de produtos ao estoque com respectivos nomes, quantidades, preço e fornecedores na página HTML.
2. Extração dos dados inseridos nos inputs da página HTML
3. Envio desses dados pela requisição ```fetch``` para API de Banco de Dados do **Postgres**.
2. Armazenagem dos dados no Banco por meio do **Prisma ORM**.
3. Consulta dos dados armazenados dentro do Banco do **Postgres** com o comando: `await prisma.products.findMany();`
4. Visualização intuitiva do estoque atualizado.
   
![Mapa mental do projeto](./image/mapa-mental.png)

## Estrutura da Pasta
```shell
/controle-de-estoque    # Pasta do Projeto
    /build              # Todo o projeto compilado em JS
    /css                # Estilização da Página
    /image              # Imagens do Projeto e Mapa Mental
    /node_modules       # Dependências dos Frameworks
    /prisma             # Modelos de Dados do Prisma
        /migrations     # Migração para o Banco de Dados
    /src                # Código-fonte principal da aplicação
        /server         # Definições de Rotas da API
```

## Tecnologias Utilizadas
* JavaScript
* TypeScript
* HTML
* CSS
* Fastify
* Prisma

## Rotas
1. Rota POST para cadastrar produtos no Banco de Dados 
    ```http
    POST /inventory/product HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json

    [EXEMPLO]
    {
        "product": "Pão de Forma",
        "preco": 19.99,
        "quantidade": 3,
        "provide": "Bauducco"
    }
    ```

2. Rota GET para visualizar todos os Dados armazenados no Banco 
    ```http
    GET /inventory HTTP/1.1
    Host: localhost:3000
    ```

3. Rota PUT para atualizar os Dados dentro no Banco
    ```http
    PUT /inventory/product/:id/:option/:data HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json

    [EXEMPLO]
    {
        "id": 1,
        "option": 4
        "data": "Bauducco"
    }
    ```

4. Rota DELETE para remover os Dados dentro do Banco de Dados
    ```http
    DELETE /inventory/product/:id HTTP/1.1
    Host: localhost:3000
    ```

> [!NOTE]
>
> Lembrando que as rotas API são usadas para fins práticos e não para uso público. 

## Contribuição
 Contribuições são bem-vindas! Sinta-se à vontade para melhorar a estrutura, adicionar funcionalidade ou corrigir qualquer problema identificado.

### Diretrizes de Contribuição
- Envios de *Issues* são bem vindos.
- Detalhe bem os *Issues* onde pode ser melhorado com detalhes e tópicos de melhorias.
- Adicione comentátios explicativos após fazer *Issues* para mundança no código para facilitar a compreensão.
- Mantenha o código limpo, seguindo as melhores práticas de TypeScript, JavaScript, Express, ORM ou Banco de Dados.
- Seja cordial e construtivo nas discussões.

### Licença
 Este projeto é licenciado sob a [licença MIT](LICENSE), o que significa que você é livre para usar, modificar e distribuir este código.
 Esperamos contar com sua contribuição para tomar o Projeto JavaScript uma referência de solução práticas em JavaScript. Obrigado por fazer parte desta comunidade!

## Proprietário do Projeto
 @Gustx21
