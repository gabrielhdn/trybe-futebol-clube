# Trybe Futebol Clube

Feito no módulo de back-end da [Trybe](https://app.betrybe.com/), o TFC é uma API Rest integrada ao banco de dados MySQL. A aplicação tem por objetivo produzir e gerenciar informações sobre futebol. É possível visualizar, criar, atualizar e remover dados acerca de partidas entre dois times - bem como acessar a classificação do campeonato conforme dados previamente inseridos.

O projeto foi feito com TypeScript em Node.js. A arquitetura escolhida foi a MSC (Model, Service e Controller). Ainda foram utilizados os conceitos de SOLID em POO, autenticação via token e criptografia de senhas.

## Tecnologias

- TypeScript
- Node.js
- Express.js
- MySQL
- Sequelize (ORM)
- JSON Web Token (JWT)
- bcryptjs
- Joi
- Docker

## Executando o projeto

É recomendável utilizar o Docker para a execução do TFC. O arquivo docker-compose.yml, localizado na raiz do projeto, cria dois contêineres: "app_backend" (back-end em Node.js) e "db" (database em MySQL).

**:warning: Seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está `1.26.0` por `1.29.2`.**

**:warning: Lembre-se de parar o MySQL se estiver usando localmente na porta 3302, ou adapte.**

**:warning: Não esqueça de renomear o arquivo .env.example para .env, alterando os valores como desejar.**

Na raiz, execute o seguinte comando para iniciar os contêineres em segundo plano:

```
docker-compose up -d --build
```
 
As dependências são executadas automaticamente e o servidor é iniciado logo em seguida. É possível acessar o contêiner via logs ou acompanhá-lo pela extensão do Docker no VSCode (botão direito no contêiner -> View Logs).

✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no contêiner Docker direto no VSCode, como você faz com seus arquivos locais.
