import PragaDetalhePage, { PragaData } from "./PragaDetalhePage";

const data: PragaData = {
  slug: "baratas",
  name: "Baratas",
  scientificName: "Blattodea — o inimigo silencioso da sua saúde",
  dangerLevel: "Alto",
  dangerColor: "red",
  accentColor: "red",
  heroHighlight: "Uma barata carrega mais de 30 tipos de bactérias no corpo e nas patas.",
  heroDescription: "Ela circula pelo esgoto, entra na sua cozinha e contamina tudo que toca — sem que você perceba. Uma única barata pode indicar uma colônia de centenas escondidas nas paredes e frestas.",
  intro: [
    "As baratas pertencem à ordem Blattodea e existem há mais de 300 milhões de anos — são uma das criaturas mais adaptáveis do planeta. No ambiente urbano brasileiro, as espécies mais comuns são a barata-alemã (Blattella germanica), a barata-americana (Periplaneta americana) e a barata-australiana (Periplaneta australasiae).",
    "São insetos de hábitos noturnos que preferem ambientes quentes, úmidos e escuros. Durante o dia ficam escondidas em frestas, atrás de eletrodomésticos, dentro de armários e em ralos. À noite saem para se alimentar, percorrendo esgotos, lixo e superfícies da cozinha na mesma rota.",
    "Uma fêmea de barata produz até 400 filhotes por ano. Cada ooteca (cápsula de ovos) contém até 50 ovos, e uma única fêmea pode produzir até 8 ootecas ao longo da vida. Em condições ideais de umidade e calor — como cozinhas e banheiros — a reprodução é ainda mais acelerada. Sem tratamento profissional, uma infestação domina o ambiente em semanas.",
  ],
  locations: [
    "Cozinha — atrás da geladeira, fogão, pia e sob armários",
    "Banheiro — dentro de ralos, sob pias e atrás de azulejos soltos",
    "Despensa — entre caixas de papelão e embalagens de alimentos",
    "Instalações — dentro de eletrodomésticos, painéis e fiações elétricas",
    "Esgotos e tubulações — principal via de acesso ao interior do imóvel",
    "Lixeiras e áreas de descarte de alimentos",
  ],
  prevention: [
    "Manter alimentos em embalagens hermeticamente fechadas",
    "Limpar imediatamente restos de comida e bebidas derramadas",
    "Vedar frestas, rachaduras e aberturas nas paredes, rodapés e soleiras",
    "Manter o ambiente seco — eliminar vazamentos e fontes de umidade",
    "Instalar telas em ralos de banheiro e cozinha",
    "Manter lixeiras com tampas e esvaziar regularmente",
    "Evitar acúmulo de caixas de papelão e materiais orgânicos",
  ],
  control: [
    "Diagnóstico técnico — identificação da espécie, nível de infestação e focos",
    "Aplicação de gel inseticida em pontos de alimentação e abrigo",
    "Borrifação com inseticida residual em frestas, rodapés e pontos críticos",
    "Tratamento de galerias e ralos com produto específico",
    "Monitoramento com armadilhas adesivas para avaliar grau de infestação",
    "Garantia de retorno caso o problema persista após o tratamento",
    "Uso exclusivo de produtos regulamentados pela ANVISA, seguros para família e pets",
  ],
  curiosities: [
    "Baratas conseguem sobreviver até uma semana sem cabeça — morrem por desidratação, não por falta do cérebro.",
    "Elas são resistentes à radiação e sobreviveriam a um cenário de guerra nuclear.",
    "Uma barata pode segurar a respiração por até 40 minutos, o que a ajuda a se locomover por encanamentos alagados.",
  ],
  icon: "🪳",
};

export default function BaratasPage() {
  return <PragaDetalhePage data={data} />;
}
