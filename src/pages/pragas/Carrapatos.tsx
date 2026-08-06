import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "carrapatos",
  name: "Carrapatos",
  scientificName: "Ixodida",
  dangerLevel: "Alto",
  dangerColor: "orange",
  accentColor: "teal",
  heroHighlight: "Vetores da Febre Maculosa — a doença infecciosa com maior letalidade no Brasil, com taxa de mortalidade acima de 20%.",
  heroDescription: "Os carrapatos são ectoparasitas hematófagos que parasitam humanos e animais domésticos, transmitindo doenças graves como a Febre Maculosa, Doença de Lyme e Anaplasmose.",
  intro: [
    "Os carrapatos são aracnídeos da ordem Ixodida e precisam de sangue de hospedeiro para completar seu ciclo de vida. No Brasil, o Amblyomma cajennense (popularmente 'rodoleiro') é o principal vetor da Febre Maculosa Brasileira, causada pela bactéria Rickettsia rickettsii. O carrapato-marrom-do-cão (Rhipicephalus sanguineus) é o mais comum em ambientes domésticos.",
    "O ciclo de vida tem quatro estágios: ovo, larva, ninfa e adulto. Em cada estágio (exceto o de ovo), o carrapato precisa se alimentar de sangue. Uma fêmea pode botar de 2.000 a 18.000 ovos após se alimentar. O ambiente quente e úmido do Brasil é ideal para sua proliferação.",
  ],
  locations: [
    "Gramados e vegetação alta no quintal e jardim",
    "Beiras de mata e áreas rurais",
    "Pelo de cães, gatos e outros animais domésticos",
    "Frestas de canis e casinhas de pets",
    "Sofás e carpetes em ambientes infestados",
    "Roupas e calçados após atividades ao ar livre",
  ],
  prevention: [
    "Aplicar carrapaticidas nos animais domésticos conforme orientação veterinária",
    "Manter gramado sempre cortado e jardim limpo",
    "Usar calças compridas e meias ao entrar em áreas com vegetação",
    "Usar repelentes registrados na ANVISA em exposições de risco",
    "Inspecionar corpo e animais após atividades ao ar livre",
    "Limpar e desinfetar regularmente o ambiente onde o pet dorme",
  ],
  control: [
    "Tratamento carrapaticida nos animais com produtos veterinários adequados",
    "Aplicação de acaricida ambiental em gramados, jardins e canis",
    "Tratamento residual dentro do imóvel em casos de infestação indoor",
    "Remoção manual segura de carrapatos fixados com pinça adequada",
    "Monitoramento periódico dos animais e do ambiente",
    "Orientação veterinária integrada ao serviço de controle",
  ],
  curiosities: [
    "A Febre Maculosa Brasileira tem taxa de letalidade superior a 20% sem tratamento precoce.",
    "Um carrapato pode ficar fixado no hospedeiro por até 10 dias sugando sangue.",
    "Carrapatos não saltam nem voam — aguardam o hospedeiro em vegetação em postura de espera.",
  ],
  icon: "🪲",
};

export default function CarrapatosPage() {
  return <PragaDetalhePage data={data} />;
}
