import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "aranhas",
  name: "Aranhas",
  scientificName: "Araneae",
  dangerLevel: "Alto",
  dangerColor: "orange",
  accentColor: "purple",
  heroHighlight: "A maioria das aranhas é inofensiva, mas as espécies peçonhentas — como a aranha-marrom e a viúva-negra — representam sério risco à vida.",
  heroDescription: "O Brasil é um dos países com maior diversidade de aranhas do mundo. Embora a maioria seja inofensiva e até benéfica para o ecossistema, algumas espécies causam acidentes graves que exigem atendimento médico urgente.",
  intro: [
    "As aranhas são aracnídeos predadores que se alimentam principalmente de insetos. Existem mais de 46.000 espécies descritas no mundo, sendo o Brasil lar de uma das maiores diversidades do planeta. No ambiente urbano, as espécies de maior importância médica são a aranha-marrom (Loxosceles spp.), a viúva-negra (Latrodectus spp.) e a aranha-armadeira (Phoneutria spp.).",
    "A aranha-marrom é a responsável pelo maior número de acidentes graves no Brasil. Seu veneno é necrótico — causa lesão tissular progressiva que pode levar a úlceras profundas e, em casos graves, comprometimento renal. A aranha-armadeira tem veneno de ação neurotóxica e pode causar dor intensa, priapismo e comprometimento respiratório.",
    "Aranhas são atraídas por locais escuros, úmidos e com presença de outros insetos (sua alimentação). Elas não atacam por agressividade — a maioria dos acidentes ocorre quando a aranha é pressionada acidentalmente, como ao colocar um sapato onde ela estava descansando.",
  ],
  locations: [
    "Cantos e frestas de armários, gavetas e guarda-roupas",
    "Atrás de quadros, móveis e eletrodomésticos",
    "Sapatos, roupas e toalhas deixadas no chão",
    "Porões, depósitos, garagens e galpões",
    "Entulhos, tijolos, madeiras e objetos acumulados no quintal",
    "Jardins com vegetação densa e pedras",
    "Ralos e banheiros com pouca ventilação",
  ],
  prevention: [
    "Sacudir roupas, sapatos e toalhas antes de usar, especialmente após ficarem parados",
    "Manter roupas e sapatos em locais fechados e organizados",
    "Vedar frestas, rachaduras e soleiras de portas",
    "Reduzir a presença de outros insetos — aranhas seguem sua presa",
    "Eliminar entulhos, madeiras e materiais acumulados no quintal",
    "Manter ambientes arejados e iluminados — aranhas preferem o escuro",
    "Instalar telas em janelas e ventilações",
  ],
  control: [
    "Inspeção técnica para identificação das espécies presentes",
    "Aplicação de inseticida residual em pontos de repouso e frestas",
    "Controle dos insetos-presa para reduzir a disponibilidade de alimento",
    "Uso de cola adesiva (armadilha) para monitoramento e captura",
    "Dedetização geral do imóvel em casos de infestação",
    "Orientações de medidas preventivas e estruturais para o morador",
    "Em caso de picada: lavar o local e procurar pronto-socorro imediatamente",
  ],
  curiosities: [
    "A teia de aranha é proporcionalmente mais resistente que o aço — a seda de aranha suporta mais de 1 GPa de tensão.",
    "A aranha-marrom pode viver até 6 meses sem se alimentar, o que dificulta sua detecção.",
    "No Brasil, ocorrem cerca de 160.000 acidentes com aranhas por ano, segundo o Sinan/MS.",
  ],
  icon: "🕷️",
};

export default function AranhasPage() {
  return <PragaDetalhePage data={data} />;
}
