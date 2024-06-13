## Descrição

Repositório destinado ao desenvolvimento da avaliação Backend fornecida pela empra Vila.

#### Tecnologias aplicadas no projeto:
- Typescript
- Nest.JS
- Express
- TypeORM
- Mongoose
- MongoDB
- Postgre
- Docker


## Instalação

Após clonar o repositório em sua máquina, dentro do terminal do projeto execute o comando a seguir para instalar as dependências da API:

```bash
npm install
```
## Executando a API - Docker

Para executar a API em Docker, antes de tudo é necessário ter o Docker instalado em sua máquina, após isso, dentro do terminal do projeto execute:

```bash
docker-compose up --build
```
As imagens e configurações necessárias para a API executar em docker já estão configuradas.

## Executando a API - Localmente

Para executar a API localmente, verifique a configuração do arquivo .env para as credenciais de Banco de Dados, após isso execute o comando dentro do terminal do projeto: 

```bash
npm run start
```
## Insomnia
Dentro do projeto existe um arquivo Insominia exportado com todas as request dos endpoints prontas para uso: `Insomnia_2024-06-12.json`

## Executando os Testes
Para executar os testes da API, dentro do terminal do projeto execute:

```bash
npm run test
```

## Documentação Swagger
Para acessar a documentação da API é necessário ter a API executando previamente, com isso, basta entrar no endereço: 

```bash
http://localhost:3001/api
```

## Serviço em Nuvem - Heroku
Para implantar a API em algum serviço de nuvem como exemplo Heroku, pode ser seguido esses passos:

### 1. Criação de um Novo App Heroku

A criação de um Novo App Heroku pode ser feito tanto no site como por linha de comando, sendo necessário ter instalado o cli do heroku para a segunda opção.

### 2. Configuração das Variáveis de Ambiente

Se o seu projeto requer variáveis de ambiente (por exemplo, strings de conexão de banco de dados), é necessário configurar elas antes, seja no site ou pela linha de comando.

### 3. Implantação do Projeto na Heroku

Certifique-se de que todo o seu código esteja commitado no Git. Então, defina o repositório Heroku como um remote do projeto:

```bash
heroku git:remote -a backend-vila
```


## CI - Integração Continua no GitHub Actions

Para configurar a integração contínua (CI) da API, pode ser utilizado o GitHub Actions:

### 1. Criar o arquivo de workflow do GitHub Actions

1. No repositório GitHub, navegue até a aba "Actions".
2. Clique em "New workflow".
3. Escolha "set up a workflow yourself" para criar um arquivo de workflow do zero.
4. Isso abrirá o editor de workflows do GitHub, onde deve ser definido o arquivo `.yml`.

### 2. Definir o Workflow de Integração Contínua

No editor, defina os passos do seu workflow. Aqui está um exemplo básico de um arquivo `.yml` para um projeto NestJS:

```yaml
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test

    # Adicione mais comandos conforme necessário, por   exemplo, para Docker:
    # - run: docker-compose up --build -d
```

Este workflow é ativado em qualquer `push` ou `pull request` para a branch `main`. Ele define um job chamado `build` que executa em um ambiente Ubuntu com as versões 14.x e 16.x do Node.js. Os passos incluem:

- **Checkout do código**: Faz o checkout do seu código para o ambiente de execução do GitHub Actions.
- **Setup do Node.js**: Prepara o ambiente com a versão especificada do Node.js.
- **Instalação de dependências**: Executa `npm ci` para instalar as dependências do projeto.
- **Build do projeto**: Executa `npm run build` para construir seu projeto NestJS.
- **Execução de testes**: Executa `npm test` para rodar os testes do seu projeto.

### 3. Salvar e Ativar o Workflow

- Dê um nome ao arquivo, exemplo `.github/workflows/nodejs.yml`.
- Clique em "Start commit" para salvar e commitar seu arquivo de workflow no repositório.
- Uma vez commitado, o GitHub Actions automaticamente reconhecerá o arquivo de workflow e iniciará o processo conforme definido.
