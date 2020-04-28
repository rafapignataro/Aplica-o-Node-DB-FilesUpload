<br />
<h1>GoFinances</h1>
<h3>Desenvolvimento do Back-end da aplicação GoFinances</h3>

O GoFinances é uma aplicação que visa o controlar uma conta, montrando seu total, gastos e entradas. Por ela é possivel vizualiar em formato
de lista todos os gastos e entradas com seus valores e tipos( Ex: Gasto | Aula de Espanhol | R$ 90,00 | Estudos ). E para cadastrá-los é
possivel subir arquivos em CSV que são lidos e movidos para a lista. Com ela consegui aprender muitas tecnologias e no caso, como esse 
projeto é a API da aplicação, ganhei mais experiência nessa área.

## Tecnologias
- Node.js
- Express
- Typescript
- Javascript

## :rocket: Rode no seu computador!

### 1: Clone o repositorio

```sh
git clone https://github.com/rafapignataro/NodeJS-GoFinances.git
```

### 2: Instale as dependências
Com o cmd aberto, utilize cd para entrar no repositorio

```sh
cd NodeJS-GoFinances
```

No projeto utilize npm install ou yarn install
```sh
yarn install
# Ou
npm install
```

### 3: Alterar config do banco
- Na pasta do projeto, existe um arquivo chamado ormconfig.
- Altere ele para as configurações do seu banco.

### 4: Rode o projeto
Para rodar, ainda no cmd, no diretório do projeto, digite:

```sh
# com Npm
npm run dev:server
# com yarn
yarn dev:server
```

#### Agora é só acessá-lo via web: http://localhost:3333 !
