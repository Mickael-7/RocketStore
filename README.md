# Rocketlab Store - Sistema de Compras Online

Este é um projeto de interface frontend para um sistema de compras online, desenvolvido como parte da Atividade Frontend da Rocketlab DEV. [cite: 1] O sistema permite aos usuários visualizar uma lista de produtos, ver detalhes de um produto específico, adicionar e remover produtos de um carrinho de compras virtual, e visualizar o valor total do carrinho. [cite: 2, 3, 6, 7]

## Tecnologias Utilizadas

* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
* **Vite:** Ferramenta de build frontend moderna e rápida. [cite: 5]
* **React Router DOM:** Para gerenciamento de rotas na aplicação.
* **Context API (React):** Para gerenciamento do estado global do carrinho.
* **Lucide React:** (Opcional) Para ícones.
* **LocalStorage:** Para persistência básica dos dados do carrinho. [cite: 9]

## Funcionalidades Implementadas

* **Visualização de Produtos:** Exibição de uma lista de produtos na página inicial. [cite: 6]
* **Detalhes do Produto:** Página dedicada para mostrar informações detalhadas de cada produto. [cite: 6]
* **Carrinho de Compras:** [cite: 2]
    * Adicionar produtos ao carrinho. [cite: 7]
    * Remover produtos do carrinho. [cite: 7]
    * Atualizar quantidade de produtos no carrinho.
    * Exibição do valor total dos produtos no carrinho. [cite: 3]
    * Atualização do carrinho em tempo real. [cite: 4]
* **Finalizar Compra:** Simulação de finalização de compra, limpando o carrinho. [cite: 8]
* **Persistência de Dados:** O carrinho de compras persiste entre as sessões do navegador usando `localStorage`. [cite: 9]

## Passo a Passo para Rodar a Aplicação [cite: 5]

### Pré-requisitos

* Node.js (versão 18.x ou superior recomendada)
* npm (geralmente vem com o Node.js) ou yarn

### Instruções

1.  **Clone o Repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_GITHUB>
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