import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "5511999999999"; // Número do WhatsApp
  const message = "Olá! Gostaria de solicitar um orçamento para controle de pragas.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 gradient-primary p-4 rounded-full shadow-glow-lg hover:shadow-glow transition-all duration-300 hover:scale-110 animate-bounce-slow min-h-[56px] min-w-[56px] flex items-center justify-center"
      aria-label="Abrir conversa no WhatsApp para solicitar orçamento"
      title="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
    </button>
  );
};

export default WhatsAppButton;