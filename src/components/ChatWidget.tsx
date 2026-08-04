import { useState, useEffect } from "react";
import aliceImg from "@/assets/perfil_alice_chat.webp";

const WHATSAPP_NUMBER = "551637230808";
const WHATSAPP_MESSAGE = "Olá, Alice! Gostaria de solicitar um orçamento para controle de pragas.";

const ChatWidget = () => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`chat-widget-root ${visible ? "chat-widget-visible" : ""}`}
      role="complementary"
      aria-label="Chat de atendimento"
    >
      {/* Card — desktop always visible / mobile tap toggle */}
      <div
        className={`chat-widget-card ${expanded ? "chat-widget-card--open" : ""}`}
        aria-hidden={!expanded}
      >
        <button
          onClick={handleOpen}
          className="chat-widget-card-inner"
          aria-label="Abrir conversa com Alice no WhatsApp"
        >
          <div className="chat-widget-text">
            <span className="chat-widget-label">Atendimento online</span>
            <span className="chat-widget-name">Falar com a Alice</span>
          </div>
        </button>
      </div>

      {/* Bubble wrapper — rings are ::before/::after on this div */}
      <div className="chat-widget-bubble-wrap">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="chat-widget-bubble"
          aria-label={expanded ? "Fechar chat" : "Abrir chat com Alice"}
          title="Falar com a Alice"
        >
          <img
            src={aliceImg}
            alt=""
            aria-hidden="true"
            className="chat-widget-bubble-img"
            width={82}
            height={82}
            loading="lazy"
          />
        </button>
        {/* Online dot — outside button so it's not clipped */}
        <span className="chat-widget-bubble-dot" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ChatWidget;
