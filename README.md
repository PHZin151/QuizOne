# Quiz Sonic

Aplicação web de perguntas e respostas sobre o universo Sonic, desenvolvida com ReactJS e Vite.

## Como executar

1. Instale o Node.js.
2. No terminal, dentro da pasta do projeto, execute `npm install`.
3. Execute `npm run dev` para iniciar o ambiente local.
4. Para gerar a versão de produção, execute `npm run build`.

## Recursos e conceitos utilizados

- Componentes React para organizar as telas.
- `useState` para controlar a tela atual, pergunta, alternativa escolhida e pontuação.
- `useEffect` para salvar o recorde no armazenamento local do navegador.
- Renderização de listas com `map()`.
- Renderização condicional para as telas inicial, quiz e resultado.
- Layout responsivo para celulares e computadores.

## Publicação na Vercel

Importe este repositório na Vercel. O comando de build é `npm run build` e a pasta de saída é `dist`.