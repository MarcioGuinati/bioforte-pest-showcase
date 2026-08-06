import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "ratos",
  name: "Ratos",
  scientificName: "Rattus rattus / Rattus norvegicus",
  dangerLevel: "Crítico",
  dangerColor: "red",
  accentColor: "gray",
  heroHighlight: "Roedores urbanos responsáveis por dezenas de doenças fatais — incluindo leptospirose e hantavírus.",
  heroDescription: "Ratos e camundongos são pragas que adaptam com extrema facilidade ao ambiente humano. Além de transmitirem doenças graves, causam danos a estruturas elétricas, hidráulicas e alimentos, gerando prejuízos significativos e riscos à saúde pública.",
  intro: [
    "As principais espécies de roedores sinantrópicos no Brasil são o rato-de-esgoto (Rattus norvegicus), o rato-de-telhado (Rattus rattus) e o camundongo doméstico (Mus musculus). Cada espécie ocupa um nicho diferente no ambiente urbano: o rato-de-esgoto vive no solo e em esgotos; o rato-de-telhado prefere telhados, forros e locais altos; o camundongo habita o interior das construções.",
    "Os roedores possuem incisivos que crescem continuamente e precisam roer para desgastá-los. Isso faz com que corroam fios elétricos, tubulações, estruturas de madeira e embalagens de alimentos. Incêndios por curto-circuito causado por ratos são mais comuns do que se imagina.",
    "Uma fêmea de rato pode ter até 10 ninhadas por ano, com 6 a 12 filhotes cada. O período de gestação é de apenas 21 dias, e os filhotes já estão em condições de se reproduzir com 3 meses de vida. Uma infestação descontrolada cresce exponencialmente em poucos meses.",
  ],
  locations: [
    "Esgotos, galerias pluviais e tubulações — habitat primário do rato-de-esgoto",
    "Forros, telhados e sótãos — preferidos pelo rato-de-telhado",
    "Depósitos, almoxarifados e estabelecimentos com alimentos",
    "Lixeiras, composteiras e acúmulos de lixo",
    "Muros, pilhas de entulho e vegetação densa no quintal",
    "Interior de veículos, maquinários e painéis elétricos",
  ],
  prevention: [
    "Vedar todas as aberturas acima de 6 mm (buracos em paredes, ralos, frestas)",
    "Armazenar alimentos em recipientes rígidos e hermeticamente fechados",
    "Manter lixo em lixeiras com tampa e coleta frequente",
    "Eliminar fontes de água — vazamentos e ralos abertos",
    "Remover entulho, folhagem densa e objetos acumulados no quintal",
    "Instalar telas em ralos, aberturas de esgoto e calhas",
    "Não deixar alimentos de animais domésticos expostos à noite",
  ],
  control: [
    "Inspeção técnica para identificação de espécie, rotas e ninhos",
    "Instalação de ratoeiras mecânicas e armadilhas em pontos estratégicos",
    "Aplicação de rodenticidas com controle de acesso (evitar envenenamento de não-alvo)",
    "Vedação técnica dos pontos de entrada identificados",
    "Sanitização de áreas contaminadas com desinfetantes adequados",
    "Monitoramento com estações de iscagem e relatórios periódicos",
    "Plano de manejo integrado com medidas preventivas estruturais",
  ],
  curiosities: [
    "Um rato pode se espremer por orifícios do tamanho de uma moeda de R$ 0,25.",
    "Ratos podem pular verticalmente até 77 cm e nadar por mais de 1 km sem parar.",
    "A leptospirose, transmitida pela urina de ratos, mata cerca de 400 pessoas por ano no Brasil.",
  ],
  icon: "🐀",
};

export default function RatosPage() {
  return <PragaDetalhePage data={data} />;
}
