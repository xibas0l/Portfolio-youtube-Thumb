# Specification — Expansão Multi-Formato & SEO (v2.0)

## 1. Problema & Contexto

1. O portfólio atual entrega apenas prova visual de Thumbnails, deixando "Editor e Roterista" sem evidência prática na página.
2. O Google indexou o site, mas exibe o título genérico de domínio (`GitHub Pages documentation`) por ausência de metadados estruturados (`JSON-LD` e `og:site_name`), `robots.txt` e `sitemap.xml`.
3. O código JS atual está concentrado em um único arquivo, dificultando a adição de novos formatos sem acoplamento.

## 2. Requisitos Funcionais

### RF01 — Identidade e SEO Técnico

- Adicionar tags Open Graph (`og:site_name`, `og:title`, `og:description`, `og:image`, `og:url`) e `<link rel="canonical">` no `<head>`.
- Injetar script `application/ld+json` com schema `Person` / `ProfessionalService` identificando "Xibas" como autor oficial.
- Criar `robots.txt` e `sitemap.xml` na raiz do repositório apontando para a URL canônica.

### RF02 — Navegação Sticky & Fluxo Vertical

- Manter navegação fixa no topo com links âncora para: `#thumbs`, `#edicoes`, `#roteiros`, `#como-funciona`, `#contato`.
- Atualizar automaticamente o estado ativo do link na navbar conforme o usuário rola a página.

### RF03 — Seção de Edições de Vídeo (`#edicoes`)

- Exibir grid de projetos editados contendo: título do vídeo, canal/nicho, tags de técnica (ex: _Sound Design, Motion, Retenção_), e preview em formato **YouTube Facade** (`16:9`).
- Ao clicar no preview, substituir a capa pelo `<iframe>` de `https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1`.

### RF04 — Seção de Roteiros & Storytelling (`#roteiros`)

- Exibir cards estruturados mostrando: título do ensaio, duração, linha do tempo visual de atos (ex: `Gancho 0:00 -> Setup 0:30 -> Virada -> Fechamento`) e botão **"Ver Estrutura & Hook (30s)"**.
- Ao clicar no botão, abrir modal reutilizável exibindo os primeiros 30 segundos do roteiro divididos em duas colunas/blocos: **Narração (Áudio)** e **Direção Visual (B-Roll / Tela)**.

## 3. Critérios de Aceite

- [ ] Nenhum `<iframe>` do YouTube presente no DOM antes do clique do usuário.
- [ ] Zero erros no console do navegador ao carregar via servidor HTTP local e GitHub Pages.
- [ ] Validação sem erros no Rich Results Test do Google para o JSON-LD inserido.
- [ ] Todos os modais (Thumbnails e Roteiros) fecham via botão `×`, clique no backdrop e tecla `Escape`.

## 3. Critérios de Aceite

- [ ] Nenhum `<iframe>` do YouTube presente no DOM antes do clique do usuário.
- [ ] Zero erros no console do navegador ao carregar via servidor HTTP local e GitHub Pages.
- [ ] Validação sem erros no Rich Results Test do Google para o JSON-LD inserido.
- [ ] Todos os modais (Thumbnails e Roteiros) fecham via botão `×`, clique no backdrop e tecla `Escape`.
