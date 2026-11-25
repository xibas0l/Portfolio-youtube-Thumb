# Constitution — Portfólio Xibas (Thumbmaker, Editor & Roterista)

## 1. Propósito do Produto

Landing page de alta conversão para criadores de conteúdo de games e ensaios em vídeo no YouTube, provando autoridade em três frentes (Thumbnails, Edição de Vídeo e Roteiro) em menos de 30 segundos de navegação.

## 2. Princípios Arquiteturais Inegociáveis

- **Zero Build / Zero Framework:** HTML5 semântico, CSS3 modular e JavaScript ES Modules nativos (`type="module"`). Nenhuma dependência de runtime (React, Vite, Webpack) será adicionada enquanto o projeto for uma landing page pública.
- **SEO & Indexação Primeiro:** Todo conteúdo textual crítico (títulos, descrições, serviços, FAQ e dados estruturados JSON-LD) deve existir diretamente no HTML estático para leitura imediata pelo Googlebot.
- **Performance & Carregamento Preguiçoso:** Nenhum `<iframe>` externo será carregado no render inicial. Players de vídeo devem usar o padrão _YouTube Facade_ (imagem estática + injeção sob demanda no clique).
- **Caminhos Relativos Estritos:** Todo asset, CSS e import JS deve usar caminhos relativos (`./` ou `../`) para compatibilidade total com subdiretórios do GitHub Pages (`/Portfolio-youtube-Thumb/`).
- **Separação entre Dados e UI:** Nenhuma informação de portfólio (links, títulos, trechos de roteiro) deve ficar hardcoded no HTML das galerias ou nos módulos de renderização; tudo reside em `src/data/`.

## 3. Padrões de UI/UX

- **Funil Vertical Único:** Fluxo contínuo sem quebra de rotas (`Hero -> Thumbnails -> Edições -> Roteiros -> Processo -> Contato/FAQ`).
- **Navegação Persistente:** Navbar fixa (`position: sticky`) com destaque automático da seção ativa via `IntersectionObserver`.
- **Prova Concreta:** Cada especialidade exibida na headline deve ter evidência visual ou interativa correspondente na página.

- **Funil Vertical Único:** Fluxo contínuo sem quebra de rotas (`Hero -> Thumbnails -> Edições -> Roteiros -> Processo -> Contato/FAQ`).
- **Navegação Persistente:** Navbar fixa (`position: sticky`) com destaque automático da seção ativa via `IntersectionObserver`.
- **Prova Concreta:** Cada especialidade exibida na headline deve ter evidência visual ou interativa correspondente na página.
