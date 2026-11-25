# Implementation Plan — Arquitetura & Estrutura de Pastas

## 1. Estrutura de Diretórios

```text
/
├── specs/
│   ├── constitution.md
│   ├── spec.md
│   ├── plan.md
│   └── tasks.md
├── src/
│   ├── data/
│   │   ├── thumbs.js        # Metadados das thumbnails existentes
│   │   ├── videos.js        # Lista de vídeos editados (videoId, título, tags)
│   │   └── scripts.js       # Roteiros (atos + breakdown 30s áudio/vídeo)
│   ├── components/
│   │   ├── navbar.js        # Sticky scroll spy + menu mobile
│   │   └── modal.js         # Controlador único de modal (acessível via teclado/backdrop)
│   ├── sections/
│   │   ├── thumbs.js        # Renderização e filtro da galeria de thumbs
│   │   ├── videos.js        # Renderização dos cards + lógica YouTube Facade
│   │   └── scripts.js       # Renderização dos cards de roteiro + gatilho do modal
│   └── main.js              # Ponto de entrada (inicializa componentes e seções)
├── styles/
│   └── style.css            # Estilos globais + componentes (facade, timeline, modal)
├── index.html
├── robots.txt
└── sitemap.xml
```

└── sitemap.xml
