import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "5516974007842";
  const message = "Olá! Gostaria de solicitar um orçamento para controle de pragas.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 gradient-primary p-4 rounded-full shadow-glow-lg hover:shadow-glow transition-all duration-300 hover:scale-110 min-h-[56px] min-w-[56px] flex items-center justify-center group animate-scale-in"
      aria-label="Abrir conversa no WhatsApp para solicitar orçamento"
      title="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-primary-foreground group-hover:scale-110 transition-transform" aria-hidden="true" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-ping" aria-hidden="true" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full" />
    </button>
  );
};

export default WhatsAppButton;