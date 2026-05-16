import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TextShimmer } from './ui/text-shimmer';
import { AIInputWithLoading } from './ui/ai-input-with-loading';
import { DesktopTopNav } from './DesktopTopNav';
import { DesktopContentWrapper } from './DesktopContentWrapper';
import { useAuth } from '@/contexts/AuthContext';

interface PageProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function AssistenteVirtualContent({ activeTab, setActiveTab }: PageProps) {
    const { t } = useLanguage();
    const [messages, setMessages] = useState<{ text: string; isUser: boolean; isStreaming?: boolean }[]>([]);
    const [showPrompts, setShowPrompts] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    };

    useEffect(() => {
        // Only scroll to bottom when there are messages, not on initial mount
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isTyping]);

    const { user } = useAuth();

    const handleSubmit = async (message: string) => {
        console.log('User message:', message);
        setShowPrompts(false);

        // Add user message immediately
        setMessages(prev => [...prev, { text: message, isUser: true }]);

        // Show typing indicator first
        setIsTyping(true);

        try {
            // Generate IDs for compatibility with RAG workflow expectations
            const messageId = crypto.randomUUID();
            // Use a persistent session ID for this component instance or generate one
            const sessionId = 'virtual-assistant-session-' + (user?.id || 'anon');

            // Payload matching the mobile version
            const webhookPayload = {
                messageId,
                sessionId,
                userId: user?.id || 'anonymous',
                userEmail: user?.email || 'anonymous@example.com',
                pillarType: 'mental', // Using a known valid pillar type to prevent N8N routing errors
                messageText: message,
                createdAt: new Date().toISOString()
            };

            const response = await fetch(
                process.env.VITE_N8N_WEBHOOK_URL,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(webhookPayload)
                }
            );

            if (!response.ok) {
                throw new Error(`Webhook Error: ${response.status}`);
            }

            // Safely handle different response types (JSON, Text, Empty)
            const responseText = await response.text();
            console.log('DEBUG - Raw N8N Response:', responseText);
            let replyText: string | null = null;

            if (responseText) {
                try {
                    const responseData = JSON.parse(responseText);
                    console.log('DEBUG - Parsed JSON:', responseData);
                    // Helper to extract string from flexible payload
                    const extractStringFromPayload = (payload: any): string | null => {
                        if (typeof payload === 'string') return payload;
                        if (typeof payload === 'object' && payload !== null) {
                            // Common keys for RAG/Agent responses
                            const keys = ['reply', 'message', 'output', 'text', 'response', 'content', 'body', 'data'];
                            for (const key of keys) {
                                if (payload[key] && typeof payload[key] === 'string') return payload[key];
                            }
                            // If nested output
                            if (payload.output && typeof payload.output === 'string') return payload.output;
                            // If array, maybe take first element
                            if (Array.isArray(payload) && payload.length > 0) return extractStringFromPayload(payload[0]);
                        }
                        return null;
                    };
                    replyText = extractStringFromPayload(responseData);

                    // If JSON but structure unknown, backup to using the whole JSON string if it looks like a message
                    if (!replyText && typeof responseData === 'object') {
                        replyText = JSON.stringify(responseData);
                    }
                } catch (e) {
                    console.error('DEBUG - JSON Parse Error:', e);
                    // Response was not JSON, use raw text
                    replyText = responseText;
                }
            }

            // Fallback logic
            const debugMessage = responseText ? `Received: ${responseText.slice(0, 100)}...` : "Server returned empty response.";
            const aiResponse = replyText || debugMessage;

            setIsTyping(false);

            // Stream the response (simulated typing effect for UX)
            // Stream the response (simulated typing effect for UX)
            setMessages(prev => [...prev, { text: '', isUser: false, isStreaming: true }]);

            // Wait a tiny bit before starting to stream
            await new Promise(resolve => setTimeout(resolve, 100));

            for (let i = 0; i <= aiResponse.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 30)); // Faster typing for real response
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsgIndex = newMessages.length - 1;
                    if (newMessages[lastMsgIndex] && !newMessages[lastMsgIndex].isUser) {
                        newMessages[lastMsgIndex] = {
                            text: aiResponse.slice(0, i),
                            isUser: false,
                            isStreaming: i < aiResponse.length
                        };
                    }
                    return newMessages;
                });
            }

        } catch (err) {
            console.error('AI Error:', err);
            setIsTyping(false);
            setMessages(prev => [...prev, {
                text: t('assistant.error') || "Ocorreu um erro ao conectar com o assistente.",
                isUser: false,
                isStreaming: false
            }]);
        }
    };

    const promptSuggestions = [
        t('assistant.prompt1'),
        t('assistant.prompt2'),
        t('assistant.prompt3'),
        t('assistant.prompt4')
    ];

    return (
        <DesktopContentWrapper className="bg-black min-h-full h-auto">
            <DesktopTopNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="min-h-screen relative w-full">
                {/* Desktop: Centered container with better layout */}
                <div className="flex flex-col items-center justify-start min-h-screen pt-16 pb-32">
                    <div className="w-full max-w-3xl px-8">
                        {/* Header */}
                        <div className="mb-16 text-center">
                            <h1 className="font-['Pacifico',sans-serif] text-white text-[52px] leading-[52px] tracking-[0.0703px] mb-6">
                                {t('assistant.title')}
                            </h1>
                            <div className="font-['Inter',sans-serif] font-bold text-[18px]">
                                <TextShimmer
                                    duration={1.2}
                                    className='text-xl [--base-color:theme(colors.blue.400)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.400)] dark:[--base-gradient-color:theme(colors.blue.600)]'
                                >
                                    {t('assistant.subtitle')}
                                </TextShimmer>
                            </div>
                        </div>

                        {/* Pre-prompt Suggestions */}
                        {showPrompts && messages.length === 0 && (
                            <div className="space-y-4 mb-16">
                                {promptSuggestions.map((prompt, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSubmit(prompt)}
                                        className="w-full text-left px-8 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/20 transition-all duration-200 text-white/80 hover:text-white text-[16px]"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Messages Display */}
                        {messages.length > 0 && (
                            <div className="space-y-5 mb-16">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-5 rounded-2xl shadow-sm max-w-[75%] text-[16px] leading-relaxed ${msg.isUser
                                            ? 'bg-blue-600 text-white ml-auto'
                                            : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
                                            }`}>
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="mb-16">
                                <div className="p-5 bg-white/10 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 w-fit">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Desktop Input - Fixed at Bottom */}
                    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent pb-8 pt-12 z-40">
                        <div className="max-w-3xl mx-auto px-8">
                            <AIInputWithLoading
                                placeholder={t('assistant.placeholder')}
                                onSubmit={handleSubmit}
                                loadingDuration={3000}
                                minHeight={56}
                                maxHeight={200}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DesktopContentWrapper>
    );
}
