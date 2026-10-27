import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TrustSection } from './components/TrustSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { ProcessSection } from './components/ProcessSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { FinalCtaSection } from './components/FinalCtaSection.tsx';
import { Footer } from './components/Footer.tsx';
import { Chatbot } from './components/Chatbot.tsx';
import { VoiceAgentModal } from './components/VoiceAgentModal.tsx';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton.tsx';
import { ConsultationModal } from './components/ConsultationModal.tsx';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationService, setConsultationService] = useState<string | undefined>(undefined);
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);

  const handleOpenConsultation = (serviceTitle?: string) => {
    setConsultationService(serviceTitle);
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
    setConsultationService(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navigation Header */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenVoiceAgent={() => setIsVoiceAgentOpen(true)}
      />

      {/* Main Homepage Sections */}
      <main className="flex-1">
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenVoiceAgent={() => setIsVoiceAgentOpen(true)}
        />
        <TrustSection />
        <ServicesSection onOpenConsultation={handleOpenConsultation} />
        <WhyChooseUs />
        <TestimonialsSection />
        <ProcessSection onOpenConsultation={() => handleOpenConsultation()} />
        <FaqSection onOpenConsultation={() => handleOpenConsultation()} />
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenVoiceAgent={() => setIsVoiceAgentOpen(true)}
      />

      {/* Interactive AI Floating Features */}
      <Chatbot />
      <WhatsAppFloatingButton />
      
      {/* Voice AI Agent Modal */}
      <VoiceAgentModal
        isOpen={isVoiceAgentOpen}
        onClose={() => setIsVoiceAgentOpen(false)}
      />

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
        initialService={consultationService}
      />
    </div>
  );
}
