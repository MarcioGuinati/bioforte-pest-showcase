import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "formigas",
  name: "Formigas",
  scientificName: "Formicidae",
  dangerLevel: "Médio",
  dangerColor: "yellow",
  accentColor: "orange",
  heroHighlight: "Insetos sociais altamente organizados que podem contaminar alimentos e causar danos estruturais.",
  heroDescription: "As formigas vivem em colônias com centenas de milhares de indivíduos. São atraídas por alimentos doces, gordurosos e proteicos e, embora pareçam inofensivas, algumas espécies transmitem patógenos e podem danificar estruturas.",
  intro: [
    "As formigas pertencem à família Formicidae e são insetos eusociais, vivendo em colônias altamente organizadas com rainha, operárias e soldados. Existem mais de 14.000 espécies descritas no mundo, sendo o Brasil um dos países com maior biodiversidade de formigas.",
    "No ambiente urbano, as espécies mais comuns são a formiga-fantasma (Tapinoma melanocephalum), a formiga-argentina (Linepithema humile), a formiga-pavé (Pheidole megacephala) e a temida formiga lava-pés (Solenopsis saevissima), conhecida popularmente como formiga de fogo.",
    "As formigas estabelecem rastros químicos (feromônios) para guiar outras operárias até fontes de alimento. Uma única colônia pode ter múltiplos ninhos satélites distribuídos pelo imóvel, tornando o controle mais complexo sem metodologia profissional.",
  ],
  locations: [
    "Jardins e gramados — ninhos no solo sob pedras, tijolos e raízes",
    "Paredes e estruturas — principalmente em alvenaria com umidade",
    "Cozinhas e despensas — próximas a fontes de alimento",
    "Forros e telhados — ninhos em madeira úmida ou podre",
    "Vasos de plantas e canteiros internos",
    "Calhas e tubulações com infiltração de água",
  ],
  prevention: [
    "Manter alimentos em embalagens hermeticamente fechadas",
    "Limpar imediatamente restos de comida e bebidas derramadas",
    "Vedar frestas, rachaduras e aberturas nas paredes e rodapés",
    "Eliminar fontes de umidade — vazamentos e infiltrações",
    "Remover materiais em decomposição, folhas secas e entulho do jardim",
    "Manter lixeiras com tampas e esvaziar regularmente",
    "Podar árvores e arbustos que fazem contato com a fachada do imóvel",
  ],
  control: [
    "Identificação da espécie antes do tratamento — cada espécie responde diferente aos métodos",
    "Localização dos ninhos principais e satélites para tratamento direto",
    "Aplicação de iscas granuladas ou em gel específicas para cada espécie",
    "Tratamento de borrifação em perímetros e frestas com produto residual",
    "Barreira química ao redor do imóvel para impedir novas colônias",
    "Monitoramento pós-tratamento com armadilhas e inspeções periódicas",
  ],
  curiosities: [
    "Uma colônia de formiga-fantasma pode ter até 300 mil indivíduos distribuídos em dezenas de ninhos.",
    "Formigas de fogo (Solenopsis) têm veneno que pode causar reação anafilática em pessoas alérgicas.",
    "As formigas são capazes de carregar até 50 vezes o próprio peso corporal.",
  ],
  icon: "🐜",
};

export default function FormigasPage() {
  return <PragaDetalhePage data={data} />;
}
