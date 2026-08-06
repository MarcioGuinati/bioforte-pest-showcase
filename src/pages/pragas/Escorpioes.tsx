import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "escorpioes",
  name: "Escorpiões",
  scientificName: "Scorpiones",
  dangerLevel: "Crítico",
  dangerColor: "red",
  accentColor: "amber",
  heroHighlight: "O escorpião-amarelo (Tityus serrulatus) é responsável pelo maior número de mortes por animal peçonhento no Brasil.",
  heroDescription: "Os acidentes com escorpiões aumentaram mais de 500% no Brasil nos últimos 15 anos. Crianças e idosos são os mais vulneráveis ao veneno neurotóxico.",
  intro: [
    "Os escorpiões são aracnídeos peçonhentos da ordem Scorpiones. A espécie mais perigosa no Brasil é o escorpião-amarelo (Tityus serrulatus), seguido pelo escorpião-marrom (Tityus bahiensis). O Tityus serrulatus se reproduz por partenogênese — sem necessidade de macho — o que acelera sua proliferação.",
    "Escorpiões são animais noturnos que se alimentam de baratas, grilos e outros insetos. Ambientes com infestação de insetos atraem escorpiões. Eles se abrigam em locais úmidos, escuros e com frestas — ralos, entulhos e calçadas são refúgios típicos.",
  ],
  locations: [
    "Ralos de banheiro, cozinha e área de serviço",
    "Entulhos, tijolos e materiais de construção acumulados",
    "Pilhas de madeira e jardins com pedras",
    "Sapatos e roupas deixados no chão",
    "Frestas em calçadas, muros e paredes",
    "Caixas de papelão armazenadas no chão",
  ],
  prevention: [
    "Instalar telas em todos os ralos",
    "Vedar frestas em rodapés e soleiras de portas",
    "Eliminar entulhos e materiais acumulados",
    "Controlar baratas e grilos — que são alimento dos escorpiões",
    "Manter quintal limpo e gramado aparado",
    "Sacudir roupas e sapatos antes de usar",
  ],
  control: [
    "Inspeção técnica para identificação de ninhos e pontos de entrada",
    "Vedação de todas as frestas e aberturas identificadas",
    "Aplicação de inseticida residual em pontos de abrigo e percurso",
    "Controle das pragas-presa para eliminar fonte de alimento",
    "Monitoramento com armadilhas adesivas luminosas",
    "Em caso de picada: procurar pronto-socorro imediatamente",
  ],
  curiosities: [
    "Em 2022, o Brasil registrou mais de 167.000 acidentes escorpiônicos — um recorde histórico.",
    "O veneno do escorpião-amarelo é neurotóxico e pode causar insuficiência cardíaca em crianças.",
  ],
  icon: "🦂",
};

export default function EscopioesPage() {
  return <PragaDetalhePage data={data} />;
}
