# Freegurinha — Estrutura de Assets

Coloque os arquivos nas pastas abaixo.
O app carrega tudo por caminho relativo — sem base64, sem build step.

```
freegurinha/
└── public/
    └── assets/
        ├── bandeiras/          ← Bandeiras dos países (PNG 512×512)
        ├── jogadores/          ← Fotos dos jogadores Craque (PNG fundo removido)
        └── icons/              ← Ícones do álbum (PNG)
```

---

## 📁 bandeiras/

| Arquivo               | País                   | Código |
| --------------------- | ---------------------- | ------ |
| `africa-do-sul.png`   | África do Sul          | RSA    |
| `alemanha.png`        | Alemanha               | GER    |
| `arabia-saudita.png`  | Arábia Saudita         | KSA    |
| `argelia.png`         | Argélia                | ALG    |
| `argentina.png`       | Argentina              | ARG    |
| `australia.png`       | Austrália              | AUS    |
| `austria.png`         | Áustria                | AUT    |
| `bandeira.png`        | Placeholder repescagem | REP    |
| `belgica.png`         | Bélgica                | BEL    |
| `brasil.png`          | Brasil                 | BRA    |
| `cabo-verde.png`      | Cabo Verde             | CPV    |
| `canada.png`          | Canadá                 | CAN    |
| `catar.png`           | Catar                  | QAT    |
| `colombia.png`        | Colômbia               | COL    |
| `coreia-do-sul.png`   | Coreia do Sul          | KOR    |
| `costa-do-marfim.png` | Costa do Marfim        | CIV    |
| `croacia.png`         | Croácia                | CRO    |
| `curacao.png`         | Curaçao                | CUW    |
| `egito.png`           | Egito                  | EGY    |
| `equador.png`         | Equador                | ECU    |
| `escocia.png`         | Escócia                | SCO    |
| `espanha.png`         | Espanha                | ESP    |
| `estados-unidos.png`  | Estados Unidos         | USA    |
| `franca.png`          | França                 | FRA    |
| `gana.png`            | Gana                   | GHA    |
| `haiti.png`           | Haiti                  | HAI    |
| `holanda.png`         | Holanda                | NED    |
| `inglaterra.png`      | Inglaterra             | ENG    |
| `ira.png`             | Irã                    | IRN    |
| `japao.png`           | Japão                  | JAP    |
| `jordania.png`        | Jordânia               | JOR    |
| `marrocos.png`        | Marrocos               | MAR    |
| `mexico.png`          | México                 | MEX    |
| `noruega.png`         | Noruega                | NOR    |
| `nova-zelandia.png`   | Nova Zelândia          | NZL    |
| `panama.png`          | Panamá                 | PAN    |
| `paraguai.png`        | Paraguai               | PAR    |
| `portugal.png`        | Portugal               | POR    |
| `senegal.png`         | Senegal                | SEN    |
| `suica.png`           | Suíça                  | SUI    |
| `tunisia.png`         | Tunísia                | TUN    |
| `uruguai.png`         | Uruguai                | URU    |
| `uzbequistao.png`     | Uzbequistão            | UZB    |

---

## 📁 jogadores/

Fotos dos jogadores com **fundo removido** (PNG transparente).

| Arquivo                  | Jogador           | País |
| ------------------------ | ----------------- | ---- |
| `brasil-jogador.png`     | Vinícius Jr.      | BRA  |
| `argentina-jogador.png`  | Lionel Messi      | ARG  |
| `franca-jogador.png`     | Kylian Mbappé     | FRA  |
| `espanha-jogador.png`    | Lamine Yamal      | ESP  |
| `portugual-jogador.png`  | Cristiano Ronaldo | POR  |
| `holanda-jogador.png`    | Virgil van Dijk   | NED  |
| `inglaterra-jogador.png` | Jude Bellingham   | ENG  |
| `belgica-jogador.png`    | Kevin De Bruyne   | BEL  |
| `uruguai-jogador.png`    | Federico Valverde | URU  |
| `croacia-jogador.png`    | Luka Modrić       | CRO  |
| `marrocos-jogador.png`   | Achraf Hakimi     | MAR  |
| `noruega-jogador.png`    | Erling Haaland    | NOR  |
| `canada-jogador.png`     | Alphonso Davies   | CAN  |
| `eua-jogador.png`        | Christian Pulisic | USA  |
| `coreia-jogador.png`     | Son Heung-min     | KOR  |
| `alemanha-jogador.png`   | Jamal Musiala     | GER  |
| `equador-jogador.png`    | Moisés Caicedo    | ECU  |
| `colombia-jogador.png`   | Luis Díaz         | COL  |
| `paraguai-jogador.png`   | Gustavo Goméz     | PAR  |
| `argelia-jogador.png`    | Riyad Mahrez      | ALG  |
| `egito-jogador.png`      | Mohamed Salah     | EGY  |

> Para adicionar novo jogador Craque: adicione o PNG aqui e registre
> no arquivo `catalog/catalog.config.js` no array `craques[]` do time.

---

## 📁 icons/

| Arquivo               | Usado em         |
| --------------------- | ---------------- |
| `estadio.png`         | Cards de estádio |
| `especial.png`        | Cards especiais  |
| `bola-de-futebol.png` | Cards de intro   |
| `copa-do-mundo.png`   | Cards de intro   |

---

## ⚠️ Observações

- Bandeiras: recomendado **512×512px** PNG com fundo transparente
- Jogadores: PNG com **fundo removido** (transparente) — o app aplica o fundo da cor do país
- Ícones: PNG com fundo transparente, qualquer tamanho razoável
- O app não precisa de build — funciona direto abrindo `pages/app.html` num servidor local (ex: `npx serve .` ou Live Server no VSCode)
- Para deploy: hospede toda a pasta `freegurinha/` num CDN (Netlify, Vercel, GitHub Pages)
