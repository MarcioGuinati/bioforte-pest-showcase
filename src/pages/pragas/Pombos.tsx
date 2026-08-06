import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "pombos",
  name: "Pombos",
  scientificName: "Columba livia",
  dangerLevel: "Médio",
  dangerColor: "yellow",
  accentColor: "slate",
  heroHighlight: "Pombos causam danos a fachadas, transmitem doenças pelos excrementos e atraem ectoparasitas como o piolho-de-pássaro.",
  heroDescription: "A superpopulação de pombos em centros urbanos é um problema sanitário crescente. Seus excrementos corroem fachadas, poluem reservatórios de água e transmitem fungos e bactérias perigosas.",
  intro: [
    "O pombo doméstico (Columba livia) é uma espécie exótica introduzida no Brasil durante a colonização. Adaptou-se perfeitamente ao ambiente urbano, onde encontra fartura de alimento e locais para nidificação. Uma par de pombos pode gerar até 12 filhotes por ano, com ciclos reprodutivos a cada 40 dias.",
    "Os excrementos de pombos contêm fungos como Cryptococcus neoformans (causador da criptococose) e Histoplasma capsulatum (histoplasmose), além de bactérias como Salmonella. O acúmulo de fezes também corrói concreto e metal, danificando calhas, ar-condicionados e fachadas.",
  ],
  locations: [
    "Telhados, beirais e marquises",
    "Caixas de ar-condicionado e antenas",
    "Sótãos e forros de edifícios",
    "Pontes, viadutos e estruturas metálicas",
    "Pátios internos e áreas de carga",
    "Edifícios abandonados ou em construção",
  ],
  prevention: [
    "Não alimentar pombos em vias públicas ou janelas",
    "Instalar espigões ou telas em pontos de pouso e nidificação",
    "Vedar aberturas em telhados e forros que sirvam como entrada",
    "Manter calhas limpas e sem acúmulo de materiais",
    "Instalar superfícies inclinadas em pontos de pouso preferidos",
  ],
  control: [
    "Instalação de espigões anti-pouso em pontos críticos",
    "Redes de proteção em vãos, sacadas e pátios internos",
    "Gel repelente em superfícies de pouso",
    "Armadilhamento para captura humanitária em casos de superpopulação",
    "Limpeza e higienização das áreas contaminadas com EPI adequado",
    "Controle de ectoparasitas (piolhos e ácaros) associados aos pombos",
  ],
  curiosities: [
    "Um pombo produz entre 10 e 12 kg de excrementos por ano.",
    "A criptococose, transmitida por esporos nos excrementos secos, pode ser fatal em imunodeprimidos.",
  ],
  icon: "🕊️",
};

export default function PombosPage() {
  return <PragaDetalhePage data={data} />;
}
