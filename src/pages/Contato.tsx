import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Home,
  Building,
  Factory,
  Utensils
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone",
    content: "(16) 97400-7842",
    description: "Atendimento de Segunda a Sexta: 8h às 18h",
    action: "tel:+5516974007842"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    content: "(16) 97400-7842",
    description: "Atendimento rápido e direto",
    action: "https://wa.me/5516974007842"
  },
  {
    icon: Mail,
    title: "E-mail",
    content: "contato@bioforte.com.br",
    description: "Resposta em até 24 horas",
    action: "mailto:contato@bioforte.com.br"
  },
  {
    icon: MapPin,
    title: "Endereço",
    content: "São Paulo - SP",
    description: "Atendemos toda a Grande São Paulo",
    action: null
  }
];

const services = [
  { icon: Home, name: "Dedetização Residencial", value: "residencial" },
  { icon: Building, name: "Controle Comercial", value: "comercial" },
  { icon: Factory, name: "Controle Industrial", value: "industrial" },
  { icon: Utensils, name: "Segurança Alimentar", value: "alimentar" }
];

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    urgency: "",
    property: "",
    area: "",
    problem: "",
    message: "",
    consent: false
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        title: "Consentimento necessário",
        description: "Por favor, aceite os termos de privacidade para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Mensagem enviada!",
      description: "Recebemos seu contato. Nossa equipe retornará em breve.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      urgency: "",
      property: "",
      area: "",
      problem: "",
      message: "",
      consent: false
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppClick = () => {
    const message = `Olá! Gostaria de solicitar um orçamento para controle de pragas.
    
Nome: ${formData.name || "Não informado"}
Serviço: ${formData.service || "Não especificado"}
Telefone: ${formData.phone || "Não informado"}`;
    
    const url = `https://wa.me/5516974007842?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6 border-primary-foreground text-primary-foreground">
            Entre em Contato
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Solicite seu
            <br />
            <span className="text-accent"> Orçamento Gratuito</span>
          </h1>
          <p className="text-lg lg:text-xl text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            Entre em contato conosco e receba um orçamento personalizado. 
            Nossa equipe está pronta para resolver seu problema com pragas.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="glass text-center">
                <CardContent className="p-6">
                  <div className="gradient-primary p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <info.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                  {info.action ? (
                    <a 
                      href={info.action}
                      className="text-primary font-semibold hover:underline block mb-2"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="font-semibold mb-2">{info.content}</p>
                  )}
                  <p className="text-muted-foreground text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Formulário de Contato</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Fale conosco <span className="text-primary">agora mesmo</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Preencha o formulário abaixo com detalhes sobre seu problema. 
                Quanto mais informações, melhor será nossa proposta.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="glass">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Info */}
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Dados Pessoais</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo *</Label>
                            <Input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="(16) 97400-7842"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Service Info */}
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Informações do Serviço</h3>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label>Tipo de Serviço *</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              {services.map((service, index) => (
                                <label
                                  key={index}
                                  className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg border cursor-pointer transition-colors ${
                                    formData.service === service.value 
                                      ? "border-primary bg-primary/5" 
                                      : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="service"
                                    value={service.value}
                                    checked={formData.service === service.value}
                                    onChange={(e) => handleInputChange("service", e.target.value)}
                                    className="sr-only"
                                  />
                                  <service.icon className="h-5 w-5 text-primary flex-shrink-0" />
                                  <span className="text-sm font-medium">{service.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="urgency">Urgência</Label>
                              <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="baixa">Baixa - Preventivo</SelectItem>
                                  <SelectItem value="media">Média - Problema identificado</SelectItem>
                                  <SelectItem value="alta">Alta - Infestação ativa</SelectItem>
                                  <SelectItem value="emergencia">Emergência - Situação crítica</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="property">Tipo de Imóvel</Label>
                              <Select value={formData.property} onValueChange={(value) => handleInputChange("property", value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="casa">Casa</SelectItem>
                                  <SelectItem value="apartamento">Apartamento</SelectItem>
                                  <SelectItem value="escritorio">Escritório</SelectItem>
                                  <SelectItem value="loja">Loja/Comércio</SelectItem>
                                  <SelectItem value="restaurante">Restaurante</SelectItem>
                                  <SelectItem value="industria">Indústria</SelectItem>
                                  <SelectItem value="condominio">Condomínio</SelectItem>
                                  <SelectItem value="outro">Outro</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="area">Área Aproximada (m²)</Label>
                              <Input
                                id="area"
                                type="number"
                                value={formData.area}
                                onChange={(e) => handleInputChange("area", e.target.value)}
                                placeholder="Ex: 100"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="problem">Tipo de Praga</Label>
                              <Select value={formData.problem} onValueChange={(value) => handleInputChange("problem", value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="baratas">Baratas</SelectItem>
                                  <SelectItem value="formigas">Formigas</SelectItem>
                                  <SelectItem value="cupins">Cupins</SelectItem>
                                  <SelectItem value="ratos">Ratos/Camundongos</SelectItem>
                                  <SelectItem value="mosquitos">Mosquitos</SelectItem>
                                  <SelectItem value="aranhas">Aranhas</SelectItem>
                                  <SelectItem value="pombos">Pombos</SelectItem>
                                  <SelectItem value="percevejos">Percevejos</SelectItem>
                                  <SelectItem value="multiplas">Múltiplas pragas</SelectItem>
                                  <SelectItem value="preventivo">Controle preventivo</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem / Detalhes Adicionais</Label>
                        <Textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Descreva o problema, quando começou, onde você viu as pragas, etc..."
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) => handleInputChange("consent", !!checked)}
                        />
                        <Label htmlFor="consent" className="text-sm">
                          Aceito o tratamento dos meus dados pessoais conforme a{" "}
                          <a href="#" className="text-primary hover:underline">
                            Política de Privacidade
                          </a>
                        </Label>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button type="submit" variant="hero" size="lg" className="flex-1 w-full sm:w-auto">
                          <Send className="h-4 w-4 mr-2" />
                          Enviar Mensagem
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="lg" 
                          className="flex-1 w-full sm:w-auto"
                          onClick={handleWhatsAppClick}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Emergency Contact */}
                <Card className="glass border-destructive/20">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="bg-destructive/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-destructive" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Atendimento de Emergência</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Para casos urgentes que precisam de atendimento imediato
                      </p>
                      <Button variant="destructive" className="w-full" size="lg" asChild>
                        <a href="tel:+5516974007842">
                          (16) 97400-7842
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose Us */}
                <Card className="glass">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Por que nos escolher?</h3>
                    <div className="space-y-3">
                      {[
                        "Orçamento gratuito e sem compromisso",
                        "Atendimento em até 24 horas",
                        "Profissionais certificados",
                        "Produtos aprovados pela ANVISA",
                        "Garantia de satisfação",
                        "Cobertura em toda Grande SP"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card className="glass">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Horários de Atendimento</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Segunda - Sexta:</span>
                        <span className="font-medium">8h às 18h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábado:</span>
                        <span className="font-medium">8h às 14h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingo:</span>
                        <span className="text-muted-foreground">Fechado</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span>Emergências:</span>
                        <span className="font-medium text-destructive">24/7</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Dúvidas Frequentes</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Perguntas <span className="text-primary">frequentes</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "Quanto custa um serviço de dedetização?",
                  answer: "O valor varia conforme o tipo de imóvel, área e tipo de praga. Oferecemos orçamento gratuito e personalizado."
                },
                {
                  question: "Quanto tempo demora o atendimento?",
                  answer: "Atendemos chamadas de emergência em até 24h. Para casos não urgentes, agendamos conforme sua disponibilidade."
                },
                {
                  question: "Os produtos são seguros para pets?",
                  answer: "Sim, utilizamos apenas produtos aprovados pela ANVISA e seguimos protocolos específicos para ambientes com animais."
                },
                {
                  question: "Vocês oferecem garantia?",
                  answer: "Sim, oferecemos garantia de satisfação. Se o problema persistir, retornamos sem custo adicional."
                },
                {
                  question: "É necessário sair de casa durante o serviço?",
                  answer: "Depende do tipo de tratamento. Nossa equipe orientará sobre os procedimentos específicos para cada caso."
                },
                {
                  question: "Atendem em que regiões?",
                  answer: "Atendemos toda a Grande São Paulo: capital, ABC, Guarulhos, Osasco e região metropolitana."
                }
              ].map((faq, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-3">{faq.question}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Precisa de ajuda urgente?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para resolver seu problema com pragas. 
            Entre em contato agora mesmo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="font-semibold" asChild>
              <a href="tel:+5516974007842">
                (16) 97400-7842
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;