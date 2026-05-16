import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, ArrowUp, Brain, Activity, Wallet, Scale } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AssistenteVirtualContentProps {
  setActiveTab: (tab: string) => void;
}

const BG     = '#ffffff';
const CARD   = '#f2f1ef';
const BORDER = 'rgba(0,0,0,0.05)';

const PROMPT_CHIPS = [
  { Icon: Brain, text: 'Não consigo desligar a cabeça' },
  { Icon: Activity, text: 'Sinto o corpo todo preso' },
  { Icon: Wallet, text: 'Quero organizar-me financeiramente' },
  { Icon: Scale, text: 'Sinto-me injustiçado no trabalho' },
];

type Message = { text: string; isUser: boolean; isStreaming?: boolean };

export function AssistenteVirtualContent({ setActiveTab }: AssistenteVirtualContentProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isEmpty = messages.length === 0 && !isTyping;

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;
    setShowChips(false);
    setInput('');
    setMessages(prev => [...prev, { text, isUser: true }]);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1100));
    setIsTyping(false);

    const aiResponse = t('assistant.response');
    const idx = messages.length + 1;
    setMessages(prev => [...prev, { text: '', isUser: false, isStreaming: true }]);
    await new Promise(r => setTimeout(r, 80));

    for (let i = 0; i <= aiResponse.length; i++) {
      await new Promise(r => setTimeout(r, 55));
      setMessages(prev => {
        const next = [...prev];
        next[idx] = { text: aiResponse.slice(0, i), isUser: false, isStreaming: i < aiResponse.length };
        return next;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(input);
    }
  };



  return (
    <div className="min-h-screen flex flex-col relative">

      {/* Fixed header */}
      <div
        className="sticky top-0 z-30 flex items-center gap-3 px-5 py-4"
        style={{
          background: `transparent`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm border border-[#1565C0]/10">
            <img src="/logo-icon.png" alt="" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="font-pacifico text-[#0a0a0a] text-[20px] font-semibold tracking-tight">Mensagens</h1>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-40">

        {/* Empty state */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center pt-12 pb-8">
            <div
              className="size-16 rounded-[28px] flex items-center justify-center mb-5 shadow-sm bg-white"
              style={{ border: '1px solid rgba(123,92,255,0.25)' }}
            >
              <MessageSquare size={28} style={{ color: '#1565C0' }} />
            </div>
            <h2 className="font-pacifico text-[#0a0a0a] text-[24px] font-light text-center leading-tight mb-2 tracking-wide">
              {t('assistant.title')}
            </h2>
            <p className="font-poppins text-[#474747] text-[14px] text-center max-w-[260px] leading-relaxed">
              {t('assistant.subtitle')}
            </p>
          </div>
        )}

        {/* Prompt chips */}
        {showChips && isEmpty && (
          <div className="flex flex-col gap-2.5 mt-2">
            {PROMPT_CHIPS.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(chip.text)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-[28px] text-left active:scale-[0.97] transition-transform shadow-sm bg-white"
                style={{ border: `1px solid #ecece7` }}
              >
                <chip.Icon size={18} className="text-[#1565C0]" />
                <span className="font-poppins text-[#474747] text-[14px] font-medium flex-1">{chip.text}</span>
                <span className="text-[#474747] text-[12px]">→</span>
              </button>
            ))}
          </div>
        )}

        {/* Message bubbles */}
        <div className="space-y-3 mt-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!msg.isUser && (
                <div
                  className="size-7 rounded-full flex items-center justify-center mr-2 mt-0.5 shrink-0 bg-white shadow-sm border border-black/5"
                >
                  <MessageSquare size={13} style={{ color: '#1565C0' }} />
                </div>
              )}
              <div
                className="px-4 py-3 rounded-[28px] max-w-[78%] font-poppins text-[14px] leading-relaxed shadow-sm"
                style={
                  msg.isUser
                    ? { background: '#1565C0', color: '#fff', borderRadius: '12px 12px 2px 12px' }
                    : { background: '#ffffff', border: `1px solid #ecece7`, color: '#0a0a0a', borderRadius: '12px 12px 12px 2px' }
                }
              >
                {msg.text}
                {msg.isStreaming && (
                  <span
                    className="inline-block w-0.5 h-3.5 ml-0.5 align-middle animate-pulse rounded-full"
                    style={{ background: '#1565C0' }}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div
              className="flex justify-start"
            >
              <div
                className="size-7 rounded-full flex items-center justify-center mr-2 mt-0.5 shrink-0 bg-white shadow-sm border border-black/5"
              >
                <MessageSquare size={13} style={{ color: '#1565C0' }} />
              </div>
              <div
                className="px-4 py-3 rounded-[28px] shadow-sm bg-white"
                style={{ border: `1px solid #ecece7` }}
              >
                <div className="flex items-center gap-1.5">
                  {[0, 150, 300].map((delay) => (
                    <div
                      key={delay}
                      className="size-2 rounded-full animate-bounce"
                      style={{ background: 'rgba(0,0,0,0.2)', animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed input bar */}
      <div
        className="fixed bottom-0 left-0 right-0 px-4 pb-24 pt-3 z-40"
        style={{
          background: `linear-gradient(to top, transparent 70%, transparent)`,
        }}
      >
        <div
          className="flex items-end gap-3 px-4 py-3 rounded-[28px] shadow-sm bg-white"
          style={{ border: `1px solid #ecece7` }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('assistant.placeholder')}
            rows={1}
            className="font-poppins flex-1 bg-transparent text-[#0a0a0a] text-[14px] placeholder:text-[#474747] resize-none outline-none leading-relaxed max-h-[120px] overflow-y-auto"
          />
          <button
            onClick={() => handleSubmit(input)}
            disabled={!input.trim()}
            className="size-9 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90"
            style={{
              background: input.trim() ? '#1565C0' : '#f2f1ef',
              border: input.trim() ? 'none' : '1px solid #ecece7',
            }}
          >
            <ArrowUp size={16} style={{ color: input.trim() ? '#fff' : '#a3a3a3' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
