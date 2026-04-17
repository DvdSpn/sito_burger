import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ message, number, label }) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-floating-btn"
      className="wa-pulse fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-emerald-400/40 bg-[#25D366] px-5 py-3 font-bold text-stone-950 shadow-2xl transition-transform hover:-translate-y-0.5 hover:bg-emerald-400 md:bottom-10 md:right-10"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-xs uppercase tracking-mega">{label}</span>
    </a>
  );
}
