import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// Animation hook removed - using simple visibility

const FAQSection = () => {
  const sectionRef = React.useRef(null);
  const isVisible = true;
  const faqData = [
    {
      question: "O que é o programa Melhor Saúde?",
      answer: (
        <div>
          <p>É uma plataforma digital de bem-estar corporativo que disponibiliza apoio em quatro pilares: saúde mental, bem-estar físico, assistência financeira e assistência jurídica/social.</p>
          <p className="mt-2">A experiência combina diagnóstico guiado, chat contextual, agendamento de sessões com especialistas e acompanhamento das quotas atribuídas pela sua empresa.</p>
        </div>
      )
    },
    {
      question: "Como funciona o diagnóstico e o chat inicial?",
      answer: "Ao escolher um pilar responde a duas perguntas rápidas para identificarmos a sua necessidade principal. Em seguida pode usar o chat para partilhar mais contexto; essa informação fica disponível para o especialista que o vai atender."
    },
    {
      question: "Como posso agendar uma sessão?",
      answer: "Após completar o diagnóstico, selecione um especialista recomendado (ou outro profissional disponível), escolha o tipo de sessão (videochamada ou chamada telefónica) e confirme o horário pretendido. Receberá a confirmação no painel “Próximas Sessões”."
    },
    {
      question: "Posso solicitar apoio urgente?",
      answer: "Sim. Utilize o botão “Solicitar chamada” no topo do chat quando precisar de falar com alguém o mais rápido possível. O pedido é encaminhado imediatamente para a equipa de especialistas."
    },
    {
      question: "Quantas sessões posso utilizar?",
      answer: "O limite depende do plano contratado pela sua empresa. As quotas disponíveis são atualizadas automaticamente e podem ser consultadas na secção “Meu percurso”."
    },
    {
      question: "Os especialistas são certificados?",
      answer: "Todos os profissionais passam por um processo de validação documental e clínica antes de integrarem a rede da Melhor Saúde. Trabalhamos apenas com especialistas licenciado(a)s nas respetivas áreas."
    },
    {
      question: "Posso reagendar ou cancelar uma sessão?",
      answer: "Sim. Na secção “Próximas Sessões” pode reagendar ou cancelar até 24 horas antes do horário marcado. Cancelamentos de última hora podem contar como sessão utilizada."
    },
    {
      question: "A plataforma funciona no telemóvel?",
      answer: "Sim. Todo o portal é responsivo e pode ser utilizado a partir de qualquer navegador moderno em desktop, tablet ou smartphone."
    },
    {
      question: "Como contacto o suporte?",
      answer: "Abra a secção “Ajuda” no painel do colaborador. A partir daí pode abrir um ticket ou seguir as instruções para falar com a equipa de suporte designada pela sua empresa."
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre respostas às questões mais comuns sobre o nosso programa de bem-estar
          </p>
        </div>

        <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className={`text-center mt-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-muted-foreground mb-4">
            Não encontrou a resposta que procura?
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Contactar Suporte
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;