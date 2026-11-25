# Tasks — Checklist de Execução

## Fase 1: SEO & Identidade (Camada Estática)

- [X] **T1.1:** Adicionar `<link rel="canonical">`, `og:site_name` ("Xibas Portfólio") e meta tags sociais no `<head>` do `index.html`.
- [X] **T1.2:** Inserir bloco `<script type="application/ld+json">` com schema `Person` no `index.html`.
- [X] **T1.3:** Criar `robots.txt` liberando rastreamento e apontando para o sitemap.
- [X] **T1.4:** Criar `sitemap.xml` com a URL principal do portfólio.

## Fase 2: Refatoração Modular (ES Modules)

- [X] **T2.1:** Criar estrutura `src/data/`, `src/components/`, `src/sections/` e atualizar `index.html` para `<script type="module" src="./src/main.js"></script>`.
- [X] **T2.2:** Extrair dados das thumbnails atuais para `src/data/thumbs.js` e renderização para `src/sections/thumbs.js`.
- [X] **T2.3:** Unificar lógica de abertura/fechamento de modal em `src/components/modal.js` (suporte a `Esc`, clique fora e foco).
- [X] **T2.4:** Implementar `src/components/navbar.js` com sticky header e `IntersectionObserver` para destacar a seção atual.

## Fase 3: Seção de Edições de Vídeo (`#edicoes`)

- [X] **T3.1:** Criar `src/data/videos.js` com 2 a 4 projetos reais do canal/clientes.
- [X] **T3.2:** Criar `src/sections/videos.js` renderizando cards com o padrão _YouTube Facade_ (`data-video-id` + thumbnail `maxresdefault.jpg` + botão play).
- [X] **T3.3:** Estilizar `.video-facade` (aspect-ratio `16/9`, overlay hover, botão play centralizado e transição suave para `<iframe>`).

## Fase 4: Seção de Roteiros (`#roteiros`)

- [X] **T4.1:** Criar `src/data/scripts.js` com 2 a 3 estudos de caso contendo `acts` e `hookBreakdown` (primeiros 30 segundos).
- [X] **T4.2:** Criar `src/sections/scripts.js` exibindo os cards com linha do tempo dos atos e botão de abertura do modal.
- [X] **T4.3:** Renderizar dentro do modal a tabela/grid comparativo de **Áudio (Narração)** vs. **Visual (Direção de Tela)**.

## Fase 5: Validação & Deploy

- [X] **T5.1:** Testar localmente via `python -m http.server 8000` (desktop + mobile viewport) verificando caminhos relativos e console limpo.
- [ ] **T5.2:** Fazer push para `main`, validar build do GitHub Pages e solicitar reindexação da URL no Google Search Console.
