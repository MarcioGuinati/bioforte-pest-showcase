import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "cupins",
  name: "Cupins",
  scientificName: "Isoptera",
  dangerLevel: "Alto",
  dangerColor: "orange",
  accentColor: "yellow",
  heroHighlight: "Silenciosos e destrutivos — os cupins consomem madeira 24 horas por dia sem que você perceba.",
  heroDescription: "Os cupins causam prejuízos bilionários no Brasil a cada ano. Eles se alimentam de celulose presente em madeiras, papelões, livros e estruturas e podem comprometer a integridade estrutural de um imóvel antes mesmo de serem notados.",
  intro: [
    "Os cupins, também chamados de térmitas, são insetos sociais da ordem Isoptera. Vivem em colônias com castas bem definidas: rainha, rei, operários e soldados. No Brasil, as espécies mais problemáticas são o cupim-subterrâneo (Coptotermes gestroi), o cupim-de-madeira-seca (Cryptotermes brevis) e o cupim-arbóreo (Nasutitermes spp.).",
    "O cupim-subterrâneo é o mais destrutivo: vive no solo e constrói galerias até atingir as madeiras do imóvel. O cupim-de-madeira-seca não precisa de contato com o solo — instala-se diretamente nas peças de madeira seca, como móveis, batentes e estruturas de telhado.",
    "Uma colônia madura pode conter mais de um milhão de indivíduos. As operárias trabalham ininterruptamente consumindo madeira. O primeiro sinal visível geralmente é a presença de cupins alados (reprodutores) em época de revoada — mas nesse estágio, a colônia já está estabelecida há anos.",
  ],
  locations: [
    "Estruturas de telhado — vigas, caibros, ripas e cumeeiras",
    "Esquadrias e batentes de portas e janelas",
    "Assoalhos e pisos de madeira",
    "Móveis antigos e peças de madeira seca",
    "Solo sob a fundação do imóvel — cupins subterrâneos",
    "Árvores e tocos no jardim — servem como fonte de colônia",
    "Papelões, livros e arquivos em locais úmidos",
  ],
  prevention: [
    "Aplicar tratamento preservativo em madeiras novas antes da instalação",
    "Controlar umidade no imóvel — cupins prosperam em ambientes úmidos",
    "Manter ventilação adequada em forros, porões e espaços confinados",
    "Evitar acúmulo de madeira, papelão e entulho próximos à edificação",
    "Realizar inspeções anuais em estruturas de madeira",
    "Não enterrar restos de madeira ou tocos no jardim",
    "Usar tintas e vernizes de qualidade que protejam a superfície da madeira",
  ],
  control: [
    "Inspeção técnica com detector de cupins e sondagem estrutural",
    "Tratamento cupinicida por injeção direta nas galerias e peças infestadas",
    "Barreira química no solo ao redor do imóvel para cupins subterrâneos",
    "Sistema de isca com monitoramento contínuo (termiteiro-isca)",
    "Tratamento por termonebulização em espaços confinados",
    "Substituição de peças estruturalmente comprometidas após o controle",
    "Laudo técnico com ANOTAÇÃO de Responsabilidade Técnica (ART) quando necessário",
  ],
  curiosities: [
    "Cupins existem há mais de 300 milhões de anos — são mais antigos que os dinossauros.",
    "Uma rainha de cupim pode viver até 25 anos e produzir até 30.000 ovos por dia.",
    "O Brasil perde cerca de R$ 2,4 bilhões por ano com os danos causados por cupins.",
  ],
  icon: "🪵",
};

export default function CupinsPage() {
  return <PragaDetalhePage data={data} />;
}
