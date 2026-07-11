import { PortfolioProject, Testimonial } from "./types";

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "shark-bite",
    title: "Shark Bite Energy - Nitro",
    category: "Comerciais",
    client: "Shark Vitality Ltd.",
    year: "2026",
    duration: "0:45",
    description: "Comercial de alta intensidade com cortes rápidos, sound design agressivo e color grading de alto impacto inspirado em tons roxos.",
    longDescription: "Uma campanha comercial disruptiva para a Shark Vitality. O objetivo foi transmitir energia implacável utilizando montagem acelerada baseada em batidas (beat-matching), sobreposição de frames analógicos e efeitos de glitch sutis. O color grading foi desenhado para criar um forte contraste entre pretos profundos e realces em ultravioleta néon, realçando a agressividade elegante do tubarão da marca.",
    thumbnailUrl: "linear-gradient(135deg, #120024 0%, #3b0764 50%, #030008 100%)",
    videoUrl: "shark",
    roles: ["Edição Comercial", "Sound Design", "Color Grading", "Motion Graphics"],
    techniques: ["Montagem Rítmica", "Glitch Transitions", "Sound Layering", "Speed Ramping"],
    colorGrading: {
      beforeColor: "grayscale(1) contrast(0.9) brightness(0.95)",
      afterColor: "contrast(1.35) brightness(1.05) saturate(1.25) sepia(0.1) hue-rotate(240deg)"
    },
    stats: {
      cuts: 64,
      hoursEditing: 18,
      timelineLayers: 12,
      audioTracks: 8
    }
  },
  {
    id: "voo-corvo",
    title: "Voo do Corvo (Flight of the Raven)",
    category: "Videoclipes",
    client: "Banda Lívia & Os Corvos",
    year: "2026",
    duration: "3:58",
    description: "Videoclipe artístico com transições por raccord visual, sobreposição de imagens dramáticas e uma narrativa onírica hipnotizante.",
    longDescription: "Produção musical independente com estética cinematográfica densa. Desenvolvemos uma montagem onírica através de 'Match Cuts' visuais conectando o voo do corvo com as expressões da vocalista. O tratamento de cor utiliza uma paleta melancólica com realces frios nas sombras e tons violetas e púrpuras quentes nos pontos de destaque, criando uma atmosfera mística e memorável.",
    thumbnailUrl: "linear-gradient(135deg, #030008 0%, #1e1b4b 50%, #4a044e 100%)",
    videoUrl: "raven",
    roles: ["Edição Geral", "Direção de Arte Digital", "Color Grading Criativo"],
    techniques: ["Match Cuts", "Sobreposição (Double Exposure)", "Câmera Lenta Orgânica", "Raccord Temporal"],
    colorGrading: {
      beforeColor: "contrast(0.8) saturate(0.6) brightness(0.9)",
      afterColor: "contrast(1.2) saturate(1.1) brightness(1.0) hue-rotate(260deg)"
    },
    stats: {
      cuts: 112,
      hoursEditing: 42,
      timelineLayers: 24,
      audioTracks: 16
    }
  },
  {
    id: "sombra-luz",
    title: "Sombra & Luz - Moræ Capsule",
    category: "Moda & Arte",
    client: "Moræ Studio Design",
    year: "2025",
    duration: "1:15",
    description: "Campanha de moda de alto padrão com câmera lenta fluida, cortes ritmados e paleta de cor monocromática com iluminação roxa.",
    longDescription: "Um curta-metragem de moda com foco em texturas e movimentos fluídos. Gravado em alta taxa de quadros (120fps), a edição foca na desaceleração extrema de tecidos em queda livre e movimentos humanos expressivos. O design de som é atmosférico (drone e texturas de vento), e o color grading atua de forma cirúrgica, isolando os tons neutros das roupas e inundando o fundo em nuances de roxo profundo.",
    thumbnailUrl: "linear-gradient(135deg, #2e1065 0%, #030008 50%, #581c87 100%)",
    videoUrl: "fashion",
    roles: ["Edição Executiva", "Direção de Som", "Color Grading Avançado"],
    techniques: ["Time Remapping", "Câmera Lenta Extrema", "Efeitos Sonoros Atmosféricos", "Máscaras de Cor"],
    colorGrading: {
      beforeColor: "saturate(0.5) contrast(1)",
      afterColor: "saturate(0.1) contrast(1.5) hue-rotate(270deg) brightness(0.95)"
    },
    stats: {
      cuts: 32,
      hoursEditing: 14,
      timelineLayers: 8,
      audioTracks: 4
    }
  },
  {
    id: "profundezas-si",
    title: "Profundezas de Si",
    category: "Documentários",
    client: "CineArte Brasil",
    year: "2026",
    duration: "8:20",
    description: "Mini-documentário intimista explorando o silêncio urbano com montagem paralela, ritmo contemplativo e correção de cor naturalista.",
    longDescription: "Documentário independente focado na jornada de artistas periféricos. A montagem utiliza o conceito de montagem dialética, contrapondo o barulho cinza da metrópole com o silêncio focado do estúdio criativo. O color grading foi tratado de maneira analógica com simulação de película de 35mm, com uma curva de tons suaves e granulação orgânica adicionada digitalmente.",
    thumbnailUrl: "linear-gradient(135deg, #090514 0%, #120024 100%)",
    videoUrl: "doc",
    roles: ["Montagem Estrutural", "Restauração de Áudio", "Grão Analógico", "Color Grading"],
    techniques: ["Montagem Dialética", "L-Cuts & J-Cuts", "Correção Primária", "Adição de Grão 35mm"],
    colorGrading: {
      beforeColor: "saturate(1) contrast(0.8) brightness(1)",
      afterColor: "saturate(0.85) contrast(1.15) brightness(0.9) sepia(0.15) hue-rotate(250deg)"
    },
    stats: {
      cuts: 184,
      hoursEditing: 68,
      timelineLayers: 16,
      audioTracks: 28
    }
  },
  {
    id: "tech-showcase",
    title: "Minimalist Tech Showcase",
    category: "Redes Sociais",
    client: "TechSphere Co.",
    year: "2026",
    duration: "0:30",
    description: "Vídeo dinâmico de alta conversão para Instagram Reels e TikTok com motion design, legendas elegantes e cortes ultra-rápidos.",
    longDescription: "Desenvolvimento de anúncio de produto em formato vertical (9:16) otimizado para prender a atenção nos primeiros 3 segundos. Desenvolvemos cortes milimetricamente alinhados a efeitos sonoros táteis (wooshes, pops, clicks), tipografia cinética de alta legibilidade centralizada na tela e correção de cor vibrante com alta saturação do roxo característico da marca.",
    thumbnailUrl: "linear-gradient(135deg, #3b0764 0%, #030008 100%)",
    videoUrl: "tech",
    roles: ["Edição Vertical", "Motion Graphics", "Beat Syncing", "Legendas Animadas"],
    techniques: ["Montagem de Alto Impacto", "Design de Áudio Tátil", "Motion Typography", "Speed Ramps"],
    colorGrading: {
      beforeColor: "saturate(0.8) contrast(0.9)",
      afterColor: "saturate(1.4) contrast(1.25) brightness(1.05)"
    },
    stats: {
      cuts: 38,
      hoursEditing: 8,
      timelineLayers: 18,
      audioTracks: 6
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Lívia Vasconcellos",
    role: "Vocalista & Compositora",
    company: "Lívia & Os Corvos",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    comment: "A equipe da Moræ transformou a essência do nosso som em uma poesia visual estonteante. O uso inovador dos match-cuts e a sensibilidade do color grading criaram uma experiência que arrepiou nossa comunidade de fãs.",
    rating: 5,
    projectTitle: "Voo do Corvo"
  },
  {
    id: "t2",
    name: "Arthur Pendragon",
    role: "Diretor de Marketing",
    company: "Shark Vitality Ltd.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    comment: "Nosso comercial de energético bateu recordes de engajamento nas redes sociais. A edição de ritmo acelerado e o design de som tátil prenderam a atenção do início ao fim. Extremamente profissionais, entrega rápida e impecável.",
    rating: 5,
    projectTitle: "Shark Bite Energy - Nitro"
  },
  {
    id: "t3",
    name: "Gabriela Brandão",
    role: "Produtora Executiva",
    company: "CineArte Brasil",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    comment: "O trabalho de montagem do documentário exigiu uma paciência cirúrgica para costurar os ritmos e sentimentos dos entrevistados. A Moræ trouxe soluções brilhantes de montagem paralela que elevaram toda a narrativa do projeto.",
    rating: 5,
    projectTitle: "Profundezas de Si"
  }
];

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  vimeo: "https://vimeo.com",
  tiktok: "https://tiktok.com",
  behance: "https://behance.net",
  whatsapp: "https://wa.me/5511999999999"
};
