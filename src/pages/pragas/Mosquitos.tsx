import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "mosquitos",
  name: "Mosquitos",
  scientificName: "Culicidae",
  dangerLevel: "Crítico",
  dangerColor: "red",
  accentColor: "blue",
  heroHighlight: "Responsáveis por mais de 1 milhão de mortes no mundo por ano — o mosquito é o animal mais letal do planeta.",
  heroDescription: "Dengue, Zika, Chikungunya, Febre Amarela e Malária — todas transmitidas por mosquitos. No Brasil, o Aedes aegypti é o principal vetor de doenças e se reproduz em qualquer acúmulo de água parada, inclusive em tampas de garrafa.",
  intro: [
    "Os mosquitos pertencem à família Culicidae e existem mais de 3.500 espécies descritas. No Brasil urbano, os mais relevantes para a saúde pública são o Aedes aegypti (vetor da dengue, Zika, chikungunya e febre amarela), o Aedes albopictus (tigre asiático) e o Culex quinquefasciatus (pernilongo ou muriçoca), vetor da filariose e causador de incômodo intenso.",
    "Apenas as fêmeas picam — elas necessitam de proteínas do sangue para a maturação dos ovos. O mosquito localiza o hospedeiro pelo gás carbônico exalado na respiração, pelo calor corporal e por odores da pele. Em condições ideais de temperatura (26–29°C), o ciclo de ovo a adulto do Aedes aegypti leva apenas 10 dias.",
    "O Aedes aegypti é uma espécie doméstica e prefere depositar seus ovos em água limpa e parada em recipientes artificiais. Os ovos são extremamente resistentes: podem sobreviver à seca por até um ano e eclodir assim que houver contato com água, tornando o controle ambiental contínuo indispensável.",
  ],
  locations: [
    "Vasos de plantas com pires acumulando água",
    "Caixas d'água abertas ou mal tampadas",
    "Calhas entupidas com acúmulo de água da chuva",
    "Pneus, latas e recipientes abandonados",
    "Lajes e coberturas com empoçamentos",
    "Ralos e bueiros com vegetação e água parada",
    "Piscinas sem manutenção, fontes e espelhos d'água",
  ],
  prevention: [
    "Eliminar todo e qualquer acúmulo de água parada no imóvel e jardim",
    "Manter caixas d'água sempre tampadas hermeticamente",
    "Limpar calhas e ralos regularmente para evitar entupimentos",
    "Trocar a água de vasos e pires a cada 3 dias ou usar areia grossa",
    "Manter piscinas tratadas com cloro e com cobertura",
    "Usar telas em janelas e portas",
    "Usar repelentes registrados na ANVISA quando em ambientes de risco",
  ],
  control: [
    "Vistoria técnica para identificação dos focos de reprodução",
    "Tratamento larvicida (BTI - Bacillus thuringiensis israelensis) em focos hídricos",
    "Nebulização (fumacê) com adulticida em casos de surto ou infestação",
    "Aplicação de inseticida residual em pontos de repouso dos adultos",
    "Armadilhas ovitrampa para monitoramento de densidade populacional",
    "Ações integradas com campanhas de educação ambiental",
  ],
  curiosities: [
    "Uma fêmea de Aedes aegypti pode produzir até 300 ovos por postura e realizar múltiplas posturas ao longo da vida.",
    "O Aedes aegypti é uma espécie exótica no Brasil — foi introduzida junto com o tráfico negreiro nos séculos XVII e XVIII.",
    "O mosquito voa em média a apenas 300 metros de onde nasceu — o que significa que o criadouro está quase sempre próximo à sua casa.",
  ],
  icon: "🦟",
};

export default function MosquitosPage() {
  return <PragaDetalhePage data={data} />;
}
