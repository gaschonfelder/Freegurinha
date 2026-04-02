/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  FREEGURINHA — CATÁLOGO OFICIAL COPA DO MUNDO 2026           ║
 * ║  catalog/catalog.config.js                                    ║
 * ║                                                               ║
 * ║  Este é o arquivo mestre de dados do álbum.                  ║
 * ║  Quando a Panini lançar o catálogo oficial (abril/2026):     ║
 * ║                                                               ║
 * ║  1. Confirme os times de repescagem (placeholder: true)       ║
 * ║  2. Preencha players[] com os 18 nomes reais por seleção      ║
 * ║  3. Atualize SPECIAL_STICKERS com os títulos oficiais         ║
 * ║  4. Ajuste ALBUM_CONFIG se o total de jogadores mudar         ║
 * ║  5. Adicione figurinhas duplas em SPECIAL_STICKERS            ║
 * ║                                                               ║
 * ║  Todo o resto do sistema se atualiza automaticamente.         ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

// ─────────────────────────────────────────────────────────────────
// 1. CONFIGURAÇÃO GERAL
// ─────────────────────────────────────────────────────────────────
export const ALBUM_CONFIG = {
  name: 'Freegurinha — Copa do Mundo 2026',
  edition: 'FIFA World Cup 2026™',
  publisher: 'Panini',
  year: 2026,
  releaseDate: '2026-04-01', // estimativa
  catalogConfirmed: false, // → true quando Panini confirmar
  totalStickers: 980, // confirmado pela Panini
  specialStickers: 68, // papel metalizado

  // Estrutura padrão por seleção
  // IDs no formato BRA01, BRA02... (por seleção, não global)
  playersPerTeam: 18, // jogadores individuais (+ escudo + foto = 20 por seleção)
  hasTeamPhoto: true, // foto coletiva (cromo 13 no Brasil = "Time")
  hasShield: true, // escudo brilhante (cromo 01)
};

// ─────────────────────────────────────────────────────────────────
// 2. TIPOS DE FIGURINHA
// ─────────────────────────────────────────────────────────────────
export const STICKER_TYPES = {
  PLAYER: 'player', // Jogador individual
  PHOTO: 'photo', // Foto coletiva
  SHIELD: 'shield', // Escudo (brilhante)
  CRAQUE: 'craque', // Card Craque (jogador especial com foto)
  STADIUM: 'stadium', // Estádio
  SPECIAL: 'special', // Especial/brilhante
  DOUBLE: 'double', // Figurinha dupla (dois jogadores)
  INTRO: 'intro', // Páginas de introdução
};

// ─────────────────────────────────────────────────────────────────
// 3. TEMAS VISUAIS POR PAÍS
//    primary: cor da borda/ring quando marcada
//    code:    cor do código do país no card
//    bar:     cor da barra de tipo
//    bg:      fundo suave para cards Craque
// ─────────────────────────────────────────────────────────────────
export const COUNTRY_THEMES = {
  MEX: { primary: '#006847', code: '#006847', bar: '#006847', bg: '#edf7f2' },
  RSA: { primary: '#FFB612', code: '#007A4D', bar: '#007A4D', bg: '#fffbea' },
  KOR: { primary: '#C60C30', code: '#C60C30', bar: '#C60C30', bg: '#fff0f2' },
  CAN: { primary: '#D52B1E', code: '#D52B1E', bar: '#D52B1E', bg: '#fff0ef' },
  QAT: { primary: '#8D1B3D', code: '#8D1B3D', bar: '#8D1B3D', bg: '#fdf0f4' },
  SUI: { primary: '#D52B1E', code: '#D52B1E', bar: '#D52B1E', bg: '#fff0ef' },
  BRA: { primary: '#009C3B', code: '#007a2e', bar: '#009C3B', bg: '#edfaf2' },
  MAR: { primary: '#C1272D', code: '#C1272D', bar: '#C1272D', bg: '#fff0f0' },
  HAI: { primary: '#00209F', code: '#00209F', bar: '#00209F', bg: '#eef0ff' },
  SCO: { primary: '#003087', code: '#003087', bar: '#003087', bg: '#eef1ff' },
  USA: { primary: '#002868', code: '#002868', bar: '#002868', bg: '#eef0fa' },
  PAR: { primary: '#D52B1E', code: '#D52B1E', bar: '#D52B1E', bg: '#fff0ef' },
  AUS: { primary: '#00843D', code: '#006830', bar: '#00843D', bg: '#edf7f2' },
  GER: { primary: '#222222', code: '#111111', bar: '#222222', bg: '#f2f2f2' },
  CUW: { primary: '#003DA5', code: '#003DA5', bar: '#003DA5', bg: '#eef1ff' },
  CIV: { primary: '#F77F00', code: '#c96800', bar: '#F77F00', bg: '#fff7ee' },
  ECU: { primary: '#c8a800', code: '#a07800', bar: '#c8a800', bg: '#fefcea' },
  NED: { primary: '#FF6600', code: '#e05500', bar: '#FF6600', bg: '#fff5ee' },
  JAP: { primary: '#003087', code: '#003087', bar: '#003087', bg: '#eef1ff' },
  TUN: { primary: '#E70013', code: '#E70013', bar: '#E70013', bg: '#fff0f1' },
  BEL: { primary: '#EF3340', code: '#cc0000', bar: '#EF3340', bg: '#fff0f1' },
  EGY: { primary: '#CE1126', code: '#CE1126', bar: '#CE1126', bg: '#fff0f2' },
  IRN: { primary: '#239F40', code: '#1a7a30', bar: '#239F40', bg: '#edf7f0' },
  NZL: { primary: '#111111', code: '#333333', bar: '#222222', bg: '#f2f2f2' },
  ESP: { primary: '#AA151B', code: '#AA151B', bar: '#AA151B', bg: '#fff0f0' },
  CPV: { primary: '#003893', code: '#003893', bar: '#003893', bg: '#eef2ff' },
  KSA: { primary: '#006C35', code: '#006C35', bar: '#006C35', bg: '#edf7f2' },
  URU: { primary: '#5EB6E4', code: '#1a7ab5', bar: '#1a7ab5', bg: '#eef8ff' },
  FRA: { primary: '#002395', code: '#002395', bar: '#002395', bg: '#eef0ff' },
  SEN: { primary: '#00853F', code: '#006830', bar: '#00853F', bg: '#edf7f2' },
  NOR: { primary: '#EF2B2D', code: '#EF2B2D', bar: '#EF2B2D', bg: '#fff0f0' },
  ARG: { primary: '#74ACDF', code: '#1a6aad', bar: '#74ACDF', bg: '#eaf4ff' },
  ALG: { primary: '#006233', code: '#006233', bar: '#006233', bg: '#edf7f2' },
  AUT: { primary: '#ED2939', code: '#ED2939', bar: '#ED2939', bg: '#fff0f1' },
  JOR: { primary: '#007A3D', code: '#c0392b', bar: '#007A3D', bg: '#edf7f2' },
  POR: { primary: '#8B0000', code: '#8B0000', bar: '#8B0000', bg: '#fff0f0' },
  UZB: { primary: '#0099B5', code: '#0074a0', bar: '#0099B5', bg: '#eef9ff' },
  COL: { primary: '#c8a800', code: '#a07800', bar: '#c8a800', bg: '#fefcea' },
  ENG: { primary: '#C8102E', code: '#012169', bar: '#C8102E', bg: '#fff0f2' },
  CRO: { primary: '#FF0000', code: '#cc0000', bar: '#FF0000', bg: '#fff0f0' },
  GHA: { primary: '#333333', code: '#333333', bar: '#333333', bg: '#f2f2f2' },
  PAN: { primary: '#D52B1E', code: '#D52B1E', bar: '#D52B1E', bg: '#fff0ef' },
  // Placeholder repescagens
  REP: { primary: '#9ca3af', code: '#6b7280', bar: '#9ca3af', bg: '#f3f4f6' },
};

// ─────────────────────────────────────────────────────────────────
// 4. GRUPOS E SELEÇÕES
//
//    players[]:    18 nomes na ordem do álbum (deixe [] até o
//                  catálogo oficial sair em abril/2026)
//
//    craques[]:    lista de jogadores que terão card CRAQUE
//                  formato: { position: 1, name: 'Vinícius Jr.',
//                             playerFile: 'brasil-jogador.png' }
//
//    placeholder:  true = vaga de repescagem ainda não confirmada
// ─────────────────────────────────────────────────────────────────
export const GROUPS = [
  {
    id: 'A',
    label: 'Grupo A',
    teams: [
      {
        code: 'MEX',
        name: 'México',
        flag: '🇲🇽',
        players: [],
        craques: [{ position: 1, name: 'Hirving Lozano', playerFile: '' }],
      },
      {
        code: 'RSA',
        name: 'África do Sul',
        flag: '🇿🇦',
        players: [],
        craques: [],
      },
      {
        code: 'KOR',
        name: 'Coreia do Sul',
        flag: '🇰🇷',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Son Heung-min',
            playerFile: 'coreia-jogador.png',
          },
        ],
      },
      {
        code: 'REP_A4',
        name: 'Rep. Europa 4',
        flag: '🏳️',
        placeholder: true,
        placeholderNote: 'Dinamarca, Macedônia do Norte, Tchéquia ou Irlanda',
        players: [],
        craques: [],
      },
    ],
  },
  {
    id: 'B',
    label: 'Grupo B',
    teams: [
      {
        code: 'CAN',
        name: 'Canadá',
        flag: '🇨🇦',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Alphonso Davies',
            playerFile: 'canada-jogador.png',
          },
        ],
      },
      {
        code: 'QAT',
        name: 'Catar',
        flag: '🇶🇦',
        players: [],
        craques: [],
      },
      {
        code: 'SUI',
        name: 'Suíça',
        flag: '🇨🇭',
        players: [],
        craques: [],
      },
      {
        code: 'REP_B1',
        name: 'Rep. Europa 1',
        flag: '🏳️',
        placeholder: true,
        placeholderNote: 'Itália, Irlanda do Norte, País de Gales ou Bósnia',
        players: [],
        craques: [],
      },
    ],
  },
  {
    id: 'C',
    label: 'Grupo C',
    teams: [
      {
        code: 'BRA',
        name: 'Brasil',
        flag: '🇧🇷',
        // Jogadores vazados — posições e nomes confirmados
        // BRA01 = Escudo (gerado automaticamente pelo hasShield)
        // BRA13 = Foto do Time (gerado automaticamente pelo hasTeamPhoto)
        // BRA14 = Craque (Vinícius Jr.)
        players: [
          // pos 02-12, 15-20 (pulando 01=escudo, 13=time, 14=craque)
          { position: 2, name: 'Alisson Becker', number: 'BRA02' },
          { position: 3, name: 'Bento', number: 'BRA03' },
          { position: 4, name: 'Marquinhos', number: 'BRA04' },
          { position: 5, name: 'Éder Militão', number: 'BRA05' },
          { position: 6, name: 'Gabriel Magalhães', number: 'BRA06' },
          { position: 7, name: 'Danilo', number: 'BRA07' },
          { position: 8, name: 'Wesley', number: 'BRA08' },
          { position: 9, name: 'Lucas Paquetá', number: 'BRA09' },
          { position: 10, name: 'Casemiro', number: 'BRA10' },
          { position: 11, name: 'Bruno Guimarães', number: 'BRA11' },
          { position: 12, name: 'Luiz Henrique', number: 'BRA12' },
          // 13 = Foto do Time (automático)
          // 14 = Craque Vinícius Jr. (automático)
          { position: 15, name: 'Rodrygo', number: 'BRA15' },
          { position: 16, name: 'João Pedro', number: 'BRA16' },
          { position: 17, name: 'Matheus Cunha', number: 'BRA17' },
          { position: 18, name: 'Gabriel Martinelli', number: 'BRA18' },
          { position: 19, name: 'Raphinha', number: 'BRA19' },
          { position: 20, name: 'Estevão', number: 'BRA20' },
        ],
        craques: [
          {
            position: 14,
            name: 'Vinícius Jr.',
            playerFile: 'brasil-jogador.webp',
          },
        ],
      },
      {
        code: 'MAR',
        name: 'Marrocos',
        flag: '🇲🇦',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Achraf Hakimi',
            playerFile: 'marrocos-jogador.png',
          },
        ],
      },
      {
        code: 'HAI',
        name: 'Haiti',
        flag: '🇭🇹',
        players: [],
        craques: [],
      },
      {
        code: 'SCO',
        name: 'Escócia',
        flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        players: [],
        craques: [],
      },
    ],
  },
  {
    id: 'D',
    label: 'Grupo D',
    teams: [
      {
        code: 'USA',
        name: 'Estados Unidos',
        flag: '🇺🇸',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Christian Pulisic',
            playerFile: 'eua-jogador.png',
          },
        ],
      },
      {
        code: 'PAR',
        name: 'Paraguai',
        flag: '🇵🇾',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Miguel Almirón',
            playerFile: 'paraguai-jogador.png',
          },
        ],
      },
      {
        code: 'AUS',
        name: 'Austrália',
        flag: '🇦🇺',
        players: [],
        craques: [],
      },
      {
        code: 'REP_D3',
        name: 'Rep. Europa 3',
        flag: '🏳️',
        placeholder: true,
        placeholderNote: 'Turquia, Romênia, Eslováquia ou Kosovo',
        players: [],
        craques: [],
      },
    ],
  },
  {
    id: 'E',
    label: 'Grupo E',
    teams: [
      {
        code: 'GER',
        name: 'Alemanha',
        flag: '🇩🇪',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Jamal Musiala',
            playerFile: 'brasil-jogador.png',
          },
        ],
      },
      {
        code: 'CUW',
        name: 'Curaçao',
        flag: '🇨🇼',
        players: [],
        craques: [],
      },
      {
        code: 'CIV',
        name: 'Costa do Marfim',
        flag: '🇨🇮',
        players: [],
        craques: [],
      },
      {
        code: 'ECU',
        name: 'Equador',
        flag: '🇪🇨',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Moisés Caicedo',
            playerFile: 'equador-jogador.png',
          },
        ],
      },
    ],
  },
  {
    id: 'F',
    label: 'Grupo F',
    teams: [
      {
        code: 'NED',
        name: 'Holanda',
        flag: '🇳🇱',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Virgil van Dijk',
            playerFile: 'holanda-jogador.png',
          },
        ],
      },
      {
        code: 'JAP',
        name: 'Japão',
        flag: '🇯🇵',
        players: [],
        craques: [],
      },
      {
        code: 'TUN',
        name: 'Tunísia',
        flag: '🇹🇳',
        players: [],
        craques: [],
      },
      {
        code: 'REP_F2',
        name: 'Rep. Europa 2',
        flag: '🏳️',
        placeholder: true,
        placeholderNote: 'Ucrânia, Suécia, Polônia ou Albânia',
        players: [],
        craques: [],
      },
    ],
  },
  {
    id: 'G',
    label: 'Grupo G',
    teams: [
      {
        code: 'BEL',
        name: 'Bélgica',
        flag: '🇧🇪',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Kevin De Bruyne',
            playerFile: 'belgica-jogador.png',
          },
        ],
      },
      {
        code: 'EGY',
        name: 'Egito',
        flag: '🇪🇬',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Mohamed Salah',
            playerFile: 'egito-jogador.png',
          },
        ],
      },
      {
        code: 'IRN',
        name: 'Irã',
        flag: '🇮🇷',
        players: [],
        craques: [],
      },
      {
        code: 'NZL',
        name: 'Nova Zelândia',
        flag: '🇳🇿',
        players: [],
        craques: [],
      },
    ],
  },
  {
    id: 'H',
    label: 'Grupo H',
    teams: [
      {
        code: 'ESP',
        name: 'Espanha',
        flag: '🇪🇸',
        players: [],
        craques: [
          { position: 1, name: 'Pedri', playerFile: 'espanha-jogador.png' },
        ],
      },
      {
        code: 'CPV',
        name: 'Cabo Verde',
        flag: '🇨🇻',
        players: [],
        craques: [],
      },
      {
        code: 'KSA',
        name: 'Arábia Saudita',
        flag: '🇸🇦',
        players: [],
        craques: [],
      },
      {
        code: 'URU',
        name: 'Uruguai',
        flag: '🇺🇾',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Federico Valverde',
            playerFile: 'uruguai-jogador.png',
          },
        ],
      },
    ],
  },
  {
    id: 'I',
    label: 'Grupo I',
    teams: [
      {
        code: 'FRA',
        name: 'França',
        flag: '🇫🇷',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Kylian Mbappé',
            playerFile: 'franca-jogador.png',
          },
        ],
      },
      {
        code: 'SEN',
        name: 'Senegal',
        flag: '🇸🇳',
        players: [],
        craques: [],
      },
      {
        code: 'NOR',
        name: 'Noruega',
        flag: '🇳🇴',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Erling Haaland',
            playerFile: 'noruega-jogador.png',
          },
        ],
      },
      {
        code: 'REP_IB',
        name: 'Rep. Mundial B',
        flag: '🏳️',
        placeholder: true,
        placeholderNote: 'Bolívia, Suriname ou Iraque',
        players: [],
        craques: [],
      },
    ],
  },
  {
    id: 'J',
    label: 'Grupo J',
    teams: [
      {
        code: 'ARG',
        name: 'Argentina',
        flag: '🇦🇷',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Lionel Messi',
            playerFile: 'argentina-jogador.png',
          },
        ],
      },
      {
        code: 'ALG',
        name: 'Argélia',
        flag: '🇩🇿',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Riyad Mahrez',
            playerFile: 'argelia-jogador.png',
          },
        ],
      },
      {
        code: 'AUT',
        name: 'Áustria',
        flag: '🇦🇹',
        players: [],
        craques: [],
      },
      {
        code: 'JOR',
        name: 'Jordânia',
        flag: '🇯🇴',
        players: [],
        craques: [],
      },
    ],
  },
  {
    id: 'K',
    label: 'Grupo K',
    teams: [
      {
        code: 'POR',
        name: 'Portugal',
        flag: '🇵🇹',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Cristiano Ronaldo',
            playerFile: 'portugual-jogador.png',
          },
        ],
      },
      {
        code: 'UZB',
        name: 'Uzbequistão',
        flag: '🇺🇿',
        players: [],
        craques: [],
      },
      {
        code: 'COL',
        name: 'Colômbia',
        flag: '🇨🇴',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Luis Díaz',
            playerFile: 'colombia-jogador.png',
          },
        ],
      },
      {
        code: 'REP_KA',
        name: 'Rep. Mundial A',
        flag: '🏳️',
        placeholder: true,
        placeholderNote: 'RD Congo, Jamaica ou Nova Caledônia',
        players: [],
        craques: [],
      },
    ],
  },
  {
    id: 'L',
    label: 'Grupo L',
    teams: [
      {
        code: 'ENG',
        name: 'Inglaterra',
        flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Jude Bellingham',
            playerFile: 'inglaterra-jogador.png',
          },
        ],
      },
      {
        code: 'CRO',
        name: 'Croácia',
        flag: '🇭🇷',
        players: [],
        craques: [
          {
            position: 1,
            name: 'Luka Modrić',
            playerFile: 'croacia-jogador.png',
          },
        ],
      },
      {
        code: 'GHA',
        name: 'Gana',
        flag: '🇬🇭',
        players: [],
        craques: [],
      },
      {
        code: 'PAN',
        name: 'Panamá',
        flag: '🇵🇦',
        players: [],
        craques: [],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// 5. ESTÁDIOS
// ─────────────────────────────────────────────────────────────────
export const STADIUMS = [
  {
    code: 'MET',
    name: 'MetLife Stadium',
    city: 'Nova York/NJ',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 82500,
    host: 'Final',
  },
  {
    code: 'DAL',
    name: 'AT&T Stadium',
    city: 'Dallas',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 80000,
    host: '',
  },
  {
    code: 'ATL',
    name: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 71000,
    host: 'Semifinal',
  },
  {
    code: 'LAX',
    name: 'SoFi Stadium',
    city: 'Los Angeles',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 70240,
    host: '',
  },
  {
    code: 'MIA',
    name: 'Hard Rock Stadium',
    city: 'Miami',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 65000,
    host: '3º Lugar',
  },
  {
    code: 'KCA',
    name: 'Arrowhead Stadium',
    city: 'Kansas City',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 76416,
    host: '',
  },
  {
    code: 'HOU',
    name: 'NRG Stadium',
    city: 'Houston',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 72220,
    host: '',
  },
  {
    code: 'SEA',
    name: 'Lumen Field',
    city: 'Seattle',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 69000,
    host: '',
  },
  {
    code: 'PHI',
    name: 'Lincoln Financial Field',
    city: 'Filadélfia',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 69796,
    host: '',
  },
  {
    code: 'SFO',
    name: "Levi's Stadium",
    city: 'San Francisco',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 68500,
    host: '',
  },
  {
    code: 'BOS',
    name: 'Gillette Stadium',
    city: 'Boston',
    country: 'USA',
    flag: '🇺🇸',
    capacity: 65878,
    host: '',
  },
  {
    code: 'VAN',
    name: 'BC Place',
    city: 'Vancouver',
    country: 'CAN',
    flag: '🇨🇦',
    capacity: 54500,
    host: '',
  },
  {
    code: 'TOR',
    name: 'BMO Field',
    city: 'Toronto',
    country: 'CAN',
    flag: '🇨🇦',
    capacity: 30000,
    host: '',
  },
  {
    code: 'AZT',
    name: 'Estádio Azteca',
    city: 'Cidade do México',
    country: 'MEX',
    flag: '🇲🇽',
    capacity: 87523,
    host: 'Abertura',
  },
  {
    code: 'GDL',
    name: 'Estádio Akron',
    city: 'Guadalajara',
    country: 'MEX',
    flag: '🇲🇽',
    capacity: 49850,
    host: '',
  },
  {
    code: 'MTY',
    name: 'Estádio BBVA',
    city: 'Monterrey',
    country: 'MEX',
    flag: '🇲🇽',
    capacity: 53500,
    host: '',
  },
];

// ─────────────────────────────────────────────────────────────────
// 6. PÁGINAS DE INTRODUÇÃO
// ─────────────────────────────────────────────────────────────────
export const INTRO_STICKERS = [
  { id: 'INT-01', name: 'Capa do Álbum', shiny: true, iconKey: 'copa' },
  {
    id: 'INT-02',
    name: 'Logo FIFA World Cup 2026',
    shiny: true,
    iconKey: 'copa',
  },
  { id: 'INT-03', name: 'Mascote Oficial', shiny: true, iconKey: 'copa' },
  { id: 'INT-04', name: 'Troféu da Copa', shiny: false, iconKey: 'copa' },
  { id: 'INT-05', name: 'Bola Oficial 2026', shiny: true, iconKey: 'bola' },
  { id: 'INT-06', name: 'Países Anfitriões', shiny: false, iconKey: 'copa' },
];

// ─────────────────────────────────────────────────────────────────
// 7. FIGURINHAS ESPECIAIS
//
//    type: 'special' | 'double'
//    Para type='double': preencher players[] com 2 nomes
// ─────────────────────────────────────────────────────────────────
export const SPECIAL_STICKERS = [
  { id: 'SPC-01', name: 'Craque da Copa', type: 'special', shiny: true },
  { id: 'SPC-02', name: 'Artilheiro', type: 'special', shiny: true },
  { id: 'SPC-03', name: 'Melhor Goleiro', type: 'special', shiny: true },
  { id: 'SPC-04', name: 'Seleção do Torneio', type: 'special', shiny: true },
  { id: 'SPC-05', name: 'Lenda da Copa', type: 'special', shiny: true },
  { id: 'SPC-06', name: 'Ídolo da Copa', type: 'special', shiny: true },
  { id: 'SPC-07', name: 'Momento Mágico 1', type: 'special', shiny: true },
  { id: 'SPC-08', name: 'Momento Mágico 2', type: 'special', shiny: true },
  { id: 'SPC-09', name: 'Momento Mágico 3', type: 'special', shiny: true },
  { id: 'SPC-10', name: 'Momento Mágico 4', type: 'special', shiny: true },
  { id: 'SPC-11', name: 'Momento Mágico 5', type: 'special', shiny: true },
  { id: 'SPC-12', name: 'Momento Mágico 6', type: 'special', shiny: true },

  // ── FIGURINHAS DUPLAS (descomentar quando catálogo confirmar) ──
  // {
  //   id:'DBL-01', name:'Dupla dos Sonhos', type:'double', shiny:true,
  //   players:['Vinícius Jr.','Rodrygo'], country:'BRA',
  // },
];

// ─────────────────────────────────────────────────────────────────
// 8. HELPER — resumo do catálogo
// ─────────────────────────────────────────────────────────────────
export function getCatalogSummary() {
  const totalTeams = GROUPS.reduce((s, g) => s + g.teams.length, 0);
  const confirmed = GROUPS.reduce(
    (s, g) => s + g.teams.filter((t) => !t.placeholder).length,
    0,
  );
  const playersTotal = totalTeams * ALBUM_CONFIG.playersPerTeam;
  const craquesTotal = GROUPS.reduce(
    (s, g) => s + g.teams.reduce((ts, t) => ts + (t.craques?.length || 0), 0),
    0,
  );
  const doublesTotal = SPECIAL_STICKERS.filter(
    (s) => s.type === 'double',
  ).length;

  return {
    totalTeams,
    confirmedTeams: confirmed,
    placeholderTeams: totalTeams - confirmed,
    playersTotal,
    photoTotal: ALBUM_CONFIG.hasTeamPhoto ? totalTeams : 0,
    shieldTotal: ALBUM_CONFIG.hasShield ? totalTeams : 0,
    craquesTotal,
    stadiumTotal: STADIUMS.length,
    introTotal: INTRO_STICKERS.length,
    specialTotal: SPECIAL_STICKERS.length,
    doublesTotal,
    grandTotal:
      playersTotal +
      (ALBUM_CONFIG.hasTeamPhoto ? totalTeams : 0) +
      (ALBUM_CONFIG.hasShield ? totalTeams : 0) +
      craquesTotal +
      STADIUMS.length +
      INTRO_STICKERS.length +
      SPECIAL_STICKERS.length,
  };
}
