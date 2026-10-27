import React from 'react';
import { COMPANY_INFO } from '../data/companyData.ts';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 left-4 sm:left-6 z-40">
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-3.5 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-slate-900/15 hover:scale-105 active:scale-95 transition-all duration-200 group"
        aria-label="Chat with EnviroTech on WhatsApp: (705) 313-6321"
      >
        {/* Authentic WhatsApp SVG Logo */}
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          className="w-5 h-5 shrink-0"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.782-.88-2.058-.98-.276-.1-.477-.15-.678.15-.2.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.175-.3-.019-.462.132-.612.136-.135.301-.35.452-.526.15-.175.2-.3.301-.5.101-.2.05-.376-.025-.526-.075-.15-.678-1.636-.929-2.241-.244-.589-.493-.509-.678-.518-.176-.009-.377-.01-.578-.01-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.08 2.912 1.23 3.113c.15.2 2.126 3.248 5.151 4.555.72.31 1.282.496 1.72.635.724.23 1.383.197 1.904.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.306.175-1.431-.075-.125-.276-.201-.577-.351z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.17L2 22l4.982-1.408C8.423 21.492 10.154 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.63 0-3.15-.47-4.44-1.28l-.32-.2-2.96.84.85-2.88-.21-.33C4.08 15.06 3.6 13.57 3.6 12c0-4.63 3.77-8.4 8.4-8.4s8.4 3.77 8.4 8.4-3.77 8.4-8.4 8.4z" />
        </svg>

        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
};
