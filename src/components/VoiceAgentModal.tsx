import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/companyData.ts';
import { Mic, MicOff, Volume2, VolumeX, X, Square, Send, Bot, User, Sparkles, Shield, AlertCircle } from 'lucide-react';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VoiceTranscriptItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [agentState, setAgentState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState<VoiceTranscriptItem[]>([
    {
      id: 'voice-welcome',
      sender: 'assistant',
      text: "Hello! I am EnviroTech's Voice AI Assistant. You can speak to me naturally about our mold removal, inspection, or water damage services in Peterborough. How can I help you today?",
    },
  ]);
  const [currentSpeechInput, setCurrentSpeechInput] = useState('');
  const [textFallbackInput, setTextFallbackInput] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, agentState]);

  // Clean up audio & speech on close
  useEffect(() => {
    if (!isOpen) {
      stopAllAudio();
      stopListening();
    }
  }, [isOpen]);

  const stopAllAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (agentState === 'speaking') {
      setAgentState('idle');
    }
  };

  // Start listening via Web Speech API
  const startListening = () => {
    stopAllAudio();
    setMicError(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicError('Speech recognition is not supported in this browser. You can type below to chat via voice assistant.');
      setAgentState('idle');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setAgentState('listening');
        setCurrentSpeechInput('');
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const recognizedText = finalTranscript || interimTranscript;
        setCurrentSpeechInput(recognizedText);

        if (finalTranscript.trim()) {
          processVoiceQuery(finalTranscript.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setMicError('Microphone permission was denied. Please allow microphone access or use the text box below.');
        } else if (event.error !== 'no-speech') {
          setMicError(`Voice error: ${event.error}`);
        }
        setAgentState('idle');
      };

      recognition.onend = () => {
        if (agentState === 'listening') {
          setAgentState('idle');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error(err);
      setMicError('Could not start microphone. You can type your question below.');
      setAgentState('idle');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }
    if (agentState === 'listening') {
      setAgentState('idle');
    }
  };

  // Process user speech or text via /api/voice
  const processVoiceQuery = async (queryText: string) => {
    stopListening();
    if (!queryText.trim()) return;

    const userEntry: VoiceTranscriptItem = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
    };
    setTranscript((prev) => [...prev, userEntry]);
    setCurrentSpeechInput('');
    setAgentState('processing');

    try {
      const historyPayload = transcript.map((item) => ({
        sender: item.sender,
        text: item.text,
      }));

      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: queryText,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error('Voice endpoint error');
      }

      const data = await res.json();
      const reply = data.replyText || "I'd be happy to help. You can call our team at (705) 313-6321.";
      const audioBase64 = data.audioBase64;

      const assistantEntry: VoiceTranscriptItem = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
      };
      setTranscript((prev) => [...prev, assistantEntry]);

      // Speak the answer unless user muted
      if (!isMuted) {
        playAssistantSpeech(reply, audioBase64);
      } else {
        setAgentState('idle');
      }
    } catch (err) {
      console.error('Voice processing error:', err);
      const fallbackEntry: VoiceTranscriptItem = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: 'I apologize, I could not hear that clearly. You can reach Jamie and our technicians directly at (705) 313-6321.',
      };
      setTranscript((prev) => [...prev, fallbackEntry]);
      setAgentState('idle');
    }
  };

  // Speak assistant response
  const playAssistantSpeech = (text: string, audioBase64?: string | null) => {
    setAgentState('speaking');

    if (audioBase64) {
      try {
        const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
        audioPlayerRef.current = audio;

        audio.onended = () => {
          setAgentState('idle');
        };

        audio.onerror = () => {
          fallbackSpeechSynthesis(text);
        };

        audio.play().catch(() => {
          fallbackSpeechSynthesis(text);
        });
        return;
      } catch (e) {
        fallbackSpeechSynthesis(text);
        return;
      }
    }

    fallbackSpeechSynthesis(text);
  };

  const fallbackSpeechSynthesis = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setAgentState('idle');
      };

      utterance.onerror = () => {
        setAgentState('idle');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setAgentState('idle');
    }
  };

  const handleInterrupt = () => {
    stopAllAudio();
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textFallbackInput.trim() || agentState === 'processing') return;
    const text = textFallbackInput.trim();
    setTextFallbackInput('');
    processVoiceQuery(text);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Talk to EnviroTech</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                  Voice AI Agent
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Peterborough & Kawartha Lakes Remediation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted) stopAllAudio();
              }}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isMuted
                  ? 'bg-amber-950/60 border-amber-600/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isMuted ? 'Unmute speech' : 'Mute speech'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="Close voice agent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Transparency Disclosure */}
        <div className="px-5 py-2 bg-emerald-950/50 border-b border-emerald-900/40 text-[11px] text-emerald-300 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span>I am EnviroTech's AI assistant. For human dispatch or urgent queries, call <strong>(705) 313-6321</strong>.</span>
        </div>

        {/* Visualizer & Interaction Area */}
        <div className="p-6 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 relative">
          
          {/* Animated Wave / Orb */}
          <div className="relative mb-4 flex items-center justify-center">
            {agentState === 'listening' && (
              <div className="absolute w-28 h-28 rounded-full bg-emerald-500/20 animate-ping"></div>
            )}
            {agentState === 'speaking' && (
              <div className="absolute w-28 h-28 rounded-full bg-teal-500/20 animate-pulse"></div>
            )}

            <button
              onClick={() => {
                if (agentState === 'listening') {
                  stopListening();
                } else if (agentState === 'speaking') {
                  handleInterrupt();
                } else {
                  startListening();
                }
              }}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer ${
                agentState === 'listening'
                  ? 'bg-rose-600 text-white ring-4 ring-rose-400/30 scale-105'
                  : agentState === 'speaking'
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/30'
                  : agentState === 'processing'
                  ? 'bg-amber-600 text-white ring-4 ring-amber-400/30 animate-spin'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white ring-4 ring-emerald-500/20 hover:scale-105'
              }`}
              title="Click to speak or interrupt"
            >
              {agentState === 'listening' ? (
                <Square className="w-7 h-7" />
              ) : agentState === 'speaking' ? (
                <Volume2 className="w-8 h-8 animate-bounce" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Soundwave Bars Animation (Active when Listening or Speaking) */}
          <div className="h-8 flex items-center justify-center gap-1.5 my-2">
            {agentState === 'listening' || agentState === 'speaking' ? (
              <>
                <span className="w-1 rounded-full bg-emerald-400 animate-soundwave-1"></span>
                <span className="w-1 rounded-full bg-emerald-400 animate-soundwave-2"></span>
                <span className="w-1 rounded-full bg-teal-300 animate-soundwave-3"></span>
                <span className="w-1 rounded-full bg-emerald-400 animate-soundwave-4"></span>
                <span className="w-1 rounded-full bg-emerald-300 animate-soundwave-5"></span>
              </>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                {agentState === 'processing'
                  ? 'Consulting EnviroTech knowledge base...'
                  : 'Tap the microphone to speak'}
              </span>
            )}
          </div>

          {/* Current Live Transcription Preview */}
          {currentSpeechInput && (
            <div className="mt-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs italic max-w-sm text-center">
              "{currentSpeechInput}"
            </div>
          )}

          {/* Mic Error Notice */}
          {micError && (
            <div className="mt-3 p-2 rounded-lg bg-amber-950/70 border border-amber-800 text-amber-200 text-xs flex items-center gap-2 max-w-md">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{micError}</span>
            </div>
          )}

          {/* Quick Voice Control Actions */}
          <div className="flex items-center gap-3 mt-4">
            {agentState === 'speaking' && (
              <button
                onClick={handleInterrupt}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <Square className="w-3.5 h-3.5 text-rose-400" />
                <span>Interrupt Speech</span>
              </button>
            )}

            {agentState === 'listening' && (
              <button
                onClick={stopListening}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
              >
                Done Speaking
              </button>
            )}

            {agentState === 'idle' && (
              <button
                onClick={startListening}
                className="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Start Speaking</span>
              </button>
            )}
          </div>

        </div>

        {/* Conversation Transcript Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950 text-xs max-h-56">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1 text-center">
            Live Voice Transcript
          </div>

          {transcript.map((item) => (
            <div
              key={item.id}
              className={`flex gap-2.5 ${
                item.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {item.sender === 'assistant' && (
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3 h-3" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed ${
                  item.sender === 'user'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                {item.text}
              </div>

              {item.sender === 'user' && (
                <div className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>

        {/* Text Alternative Input (for users declining mic or fallback) */}
        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={textFallbackInput}
              onChange={(e) => setTextFallbackInput(e.target.value)}
              placeholder="Or type your voice query here..."
              disabled={agentState === 'processing'}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={agentState === 'processing' || !textFallbackInput.trim()}
              className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white disabled:opacity-40 transition cursor-pointer"
              title="Submit query"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
