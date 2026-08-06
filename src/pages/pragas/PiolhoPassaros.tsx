import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "piolho-passaros",
  name: "Piolho de Pássaros",
  scientificName: "Dermanyssus gallinae",
  dangerLevel: "Médio",
  dangerColor: "yellow",
  accentColor: "pink",
  heroHighlight: "O ácaro vermelho de aves pode invadir residências próximas a ninhos de pombos e causar dermatite intensa em humanos.",
  heroDescription: "O Dermanyssus gallinae, conhecido como ácaro-vermelho-das-aves, é um parasita de pombos e outros pássaros que pode infestar ambientes humanos quando os hospedeiros naturais deixam a área ou morrem.",
  intro: [
    "O piolho-de-pássaro ou ácaro-vermelho-das-aves (Dermanyssus gallinae) é um ectoparasita microscópico que se alimenta do sangue de aves, principalmente pombos. Durante o dia se esconde em frestas, ninhos e estruturas próximas; à noite ataca o hospedeiro. Quando pombos abandonam ninhos próximos a uma edificação, esses ácaros migram para o interior em busca de alimento.",
    "Em humanos, o ácaro causa dermatite papular pruriginosa — pequenas pápulas avermelhadas com coceira intensa, especialmente à noite. O ciclo completo dura 7 dias e uma fêmea pode botar centenas de ovos ao longo da vida. Infestações não tratadas causam desconforto significativo e podem levar a infecções secundárias por coceira.",
  ],
  locations: [
    "Ambientes próximos a ninhos de pombos e telhados infestados",
    "Frestas de janelas, forros e paredes adjacentes a abrigos de aves",
    "Camas, sofás e tecidos em dormitórios afetados",
    "Ar-condicionados com saída próxima a ninhos de aves",
    "Galpões, depósitos e instalações industriais com infestação de pombos",
  ],
  prevention: [
    "Controlar a população de pombos no imóvel e arredores",
    "Instalar telas e espigões para impedir nidificação próxima ao imóvel",
    "Remover ninhos com EPI (luvas, máscara e óculos) e higienizar o local",
    "Vedar frestas e aberturas por onde ácaros podem migrar para o interior",
    "Inspecionar regularmente telhados, calhas e beirais",
  ],
  control: [
    "Inspeção técnica para identificar focos e ninhos de origem",
    "Remoção e descarte seguro dos ninhos infestados",
    "Aplicação de acaricida em pontos de migração e abrigo dos ácaros",
    "Tratamento do ambiente interno com acaricida apropriado",
    "Eliminação da população de pombos como medida de controle permanente",
    "Higienização e lavagem de roupas de cama e estofados afetados",
  ],
  curiosities: [
    "O ácaro-vermelho é branco quando não se alimentou e vermelho após ingurgitar sangue.",
    "Pode sobreviver por até 9 meses sem se alimentar em ambientes frios.",
    "Em granjas de postura, infestações graves causam anemia em galinhas e queda na produção de ovos.",
  ],
  icon: "🪳",
};

export default function PiolhoPassarosPage() {
  return <PragaDetalhePage data={data} />;
}
