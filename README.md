# Rocketlab Store - Sistema de Compras Online

Este é um projeto de interface frontend para um sistema de compras online, desenvolvido como parte da Atividade Frontend da Rocketlab DEV. O sistema permite aos usuários visualizar uma lista de produtos, ver detalhes de um produto específico, adicionar e remover produtos de um carrinho de compras virtual, e visualizar o valor total do carrinho. 

## Tecnologias Utilizadas

* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
* **Vite:** Ferramenta de build frontend moderna e rápida. 
* **React Router DOM:** Para gerenciamento de rotas na aplicação.
* **Context API (React):** Para gerenciamento do estado global do carrinho.
* **Lucide React:** (Opcional) Para ícones.
* **LocalStorage:** Para persistência básica dos dados do carrinho. 

## Funcionalidades Implementadas

* **Visualização de Produtos:** Exibição de uma lista de produtos na página inicial. 
* **Detalhes do Produto:** Página dedicada para mostrar informações detalhadas de cada produto. 
* **Carrinho de Compras:** 
    * Adicionar produtos ao carrinho. 
    * Remover produtos do carrinho. 
    * Atualizar quantidade de produtos no carrinho.
    * Exibição do valor total dos produtos no carrinho.
    * Atualização do carrinho em tempo real.
* **Finalizar Compra:** Simulação de finalização de compra, limpando o carrinho. 
* **Persistência de Dados:** O carrinho de compras persiste entre as sessões do navegador usando `localStorage`. 

## Passo a Passo para Rodar a Aplicação 

### Pré-requisitos

* Node.js (versão 18.x ou superior recomendada)
* npm (geralmente vem com o Node.js) ou yarn

### Instruções

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/Mickael-7/RocketStore.git
    cd rocketlab-store
    ```

2.  **Instale as Dependências:**
    Usando npm:
    ```bash
    npm install
    ```
    Ou usando yarn:
    ```bash
    yarn install
    ```

3.  **Execute a Aplicação em Modo de Desenvolvimento:**
    Usando npm:
    ```bash
    npm run dev
    ```
    Ou usando yarn:
    ```bash
    yarn dev
    ```

4.  **Abra no Navegador:**
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso. Verifique o output no terminal).

## Estrutura do Projeto (Visão Geral)
