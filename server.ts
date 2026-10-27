import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '10mb' }));

// Determine if a real API key is present
const rawApiKey = process.env.GEMINI_API_KEY;
const hasValidKey =
  rawApiKey &&
  rawApiKey.trim() !== '' &&
  rawApiKey !== 'MY_GEMINI_API_KEY' &&
  !rawApiKey.includes('PLACEHOLDER');

let aiClient: GoogleGenAI | null = null;
if (hasValidKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: rawApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (initErr) {
    console.warn('Failed to initialize GoogleGenAI client:', initErr);
    aiClient = null;
  }
}

const ENVIROTECH_SYSTEM_PROMPT = `
You are the official "EnviroTech Website Assistant" for EnviroTech Mold Pros (also known as EnviroTech Mold Remediation), a family-owned environmental and mold remediation company based in Peterborough, Ontario, Canada.

Key Verified Business Details:
- Company Name: EnviroTech Mold Pros / EnviroTech Mold Remediation
- Phone: (705) 313-6321
- WhatsApp: https://wa.me/17053136321 (Phone: +1 705 313 6321)
- Physical Address: 657 Severn Rd, Peterborough, ON K9J 1H8, Canada (also associated with 698 Bethune St, Peterborough)
- Operating History: Established and serving Ontario with a 100% satisfaction guarantee since 2012 (12+ years experience). Family-owned business.
- Primary Team: Jamie and lead certified remediation crew.
- Primary Service Areas: Peterborough, City of Kawartha Lakes (Lindsay, Bobcaygeon, Fenelon Falls), Northumberland County (Cobourg, Port Hope, Campbellford), Durham Region (Oshawa, Whitby, Bowmanville), Haliburton County, and surrounding communities.
- Hours: 24/7 emergency response for urgent moisture and water extraction; consultations and inspections scheduled Monday to Saturday.

Core Services:
1. Mold Removal & Remediation: Safe containment setup using negative air pressure HEPA zones to prevent spore spread, removal of contaminated drywall or insulation, eco-friendly antimicrobial treatments, HEPA vacuuming, and addressing the root moisture cause (e.g., poor ventilation, attic soffit blockages, plumbing leaks).
2. Mold Inspection & Air Quality Testing: Visual property assessments, thermal moisture mapping, and accredited laboratory air spore testing when required. Honest, straightforward assessments without fear tactics or sales pressure.
3. Water Damage Cleanup: 24/7 rapid emergency water extraction, structural drying with commercial dehumidifiers and air movers to prevent mold spores from propagating within 24-48 hours.
4. Attic & Basement Remediation: Attic frost-mold correction, bathroom fan ducting repairs, soffit ventilation restoration, basement moisture barrier sealing.

Strict Guidelines & Guardrails:
1. Tone: Warm, reassuring, professional, knowledgeable, and calm. Finding mold is stressful for homeowners—be helpful and supportive.
2. Answering Questions: ALWAYS answer the visitor's question directly first, and then offer a logical next step (e.g., arranging a free consultation or reaching out by phone/WhatsApp).
3. Context & Follow-ups: Interpret short conversational follow-ups (e.g. "yeah", "okay", "tell me more", "how about attic?") in the context of previous messages. Never reset the conversation or treat short confirmations as unknown input.
4. Casual & Unrelated Inquiries: If a visitor asks a polite casual greeting or unrelated question, respond courteously, naturally, and gently guide the conversation back to how EnviroTech can help their home or property.
5. Pricing: EnviroTech does not have fixed published prices because mold remediation cost strictly depends on the square footage, location (attic vs crawlspace vs drywall), moisture source, and extent of contamination. Explain this honestly and invite them to request a free, no-obligation consultation or send photos via WhatsApp for an accurate estimate. NEVER invent prices, discounts, or rate sheets.
6. Safety & Health: NEVER diagnose medical conditions or give clinical health advice. If asked about health, explain that mold spores can irritate respiratory systems, but advise consulting a physician for medical advice and let EnviroTech address the physical mold safely.
7. Safe Containment: NEVER recommend unsafe DIY removal (e.g., dry-scrubbing black mold without containment or spraying bleach on porous drywall).
8. Photo Submission: If a user wants to send a picture, let them know they can send photos directly via WhatsApp to (705) 313-6321 or schedule an on-site consultation.
9. Contact Transfers: If the user wants to speak to someone right now, provide the direct phone number (705) 313-6321 and WhatsApp link. Do NOT claim you have already called them or transferred them unless confirmed.
10. Identity: Clarify that you are EnviroTech's AI assistant when asked, and that the EnviroTech human team (Jamie and technicians) is always available by phone at (705) 313-6321.
11. Lead Collection: When the visitor expresses interest in a quote, consultation, or inspection, politely ask for their name, location/city, preferred contact number/email, and a brief description of the issue—ask one or two questions at a time.
`;

// Helper: Rule-based fallback that matches genuine verified website knowledge
function getKnowledgeBaseResponse(query: string, history: Array<{ sender: string; text: string }> = []): string {
  const q = query.toLowerCase().trim();

  // Check recent context for follow-ups
  const lastUserMsg = history.filter((h) => h.sender === 'user').slice(-2, -1)[0]?.text.toLowerCase() || '';

  if (q === 'yeah' || q === 'yes' || q === 'okay' || q === 'ok' || q === 'sure' || q === 'tell me more') {
    if (lastUserMsg.includes('cost') || lastUserMsg.includes('price')) {
      return "To give you an accurate idea for your property, we offer free, no-obligation consultations. You can describe the size and area, or call Jamie directly at (705) 313-6321. Would you like to schedule a consultation?";
    }
    if (lastUserMsg.includes('attic') || lastUserMsg.includes('basement')) {
      return "For attics and basements, our technicians check for ventilation blocks, soffit baffles, and foundation moisture. We treat the mold safely with HEPA filtration and solve the moisture root cause. Would you like an inspection for your home?";
    }
    return "We would love to help! You can request a free consultation right here on our site, message our team photos on WhatsApp, or call us at (705) 313-6321. What area of your home is concerning you?";
  }

  if (q.includes('what do you guys do') || q.includes('what do you do') || q.includes('services')) {
    return "At EnviroTech Mold Pros, we specialize in certified mold removal, comprehensive mold inspections, and 24/7 water damage cleanup across Peterborough and surrounding regions. We use negative-air HEPA containment and solve root moisture issues with a 100% satisfaction guarantee. Are you noticing mold or moisture in your home?";
  }

  if (q.includes('tell me about your company') || q.includes('about you') || q.includes('who are you')) {
    return "EnviroTech Mold Remediation is a family-owned environmental services contractor based right here in Peterborough at 657 Severn Rd. We have been helping local homeowners since 2012 with certified remediation technicians and a 100% satisfaction guarantee. How can we help you today?";
  }

  if (q.includes('do you remove mold') || q.includes('mold removal') || q.includes('remediation')) {
    return "Yes, mold removal is our core specialty! We handle residential and commercial mold infestations in attics, basements, crawlspaces, and behind drywall. We set up sealed HEPA containment to protect your living areas, remove contaminated materials, and treat the framing with eco-friendly antimicrobials. Would you like to arrange a free consultation?";
  }

  if (q.includes('water damage') || q.includes('flood') || q.includes('leak')) {
    return "Yes, we provide 24/7 emergency water damage cleanup and rapid structural drying. Because mold can begin colonizing within 24 to 48 hours of water intrusion, our emergency team extracts standing water and places industrial dehumidifiers to protect your property. For emergency dispatch, call us right now at (705) 313-6321!";
  }

  if (q.includes('serve my area') || q.includes('service area') || q.includes('where do you') || q.includes('location') || q.includes('peterborough') || q.includes('lindsay') || q.includes('kawartha') || q.includes('durham') || q.includes('northumberland')) {
    return "We proudly serve Peterborough, the City of Kawartha Lakes (Lindsay, Bobcaygeon, Fenelon Falls), Northumberland County (Cobourg, Port Hope), Durham Region (Oshawa, Bowmanville), and Haliburton County. What community is your property located in?";
  }

  if (q.includes('how much') || q.includes('cost') || q.includes('price') || q.includes('quote') || q.includes('estimate') || q.includes('rates')) {
    return "Because mold remediation depends on the square footage, location (e.g. attic vs. basement vs. drywall), and underlying moisture source, costs vary by property. We don't use high-pressure scare-tactics; we provide honest, free consultations and transparent estimates. Would you like to share a few details or call Jamie at (705) 313-6321?";
  }

  if (q.includes('how do i get started') || q.includes('get started') || q.includes('next step') || q.includes('process')) {
    return "Getting started is simple! 1) Describe your concern by calling us at (705) 313-6321 or clicking 'Get a Free Consultation' on this page. 2) We'll discuss your property and schedule an assessment. 3) Our crew provides clear guidance and guaranteed remediation. Would you like to request a consultation now?";
  }

  if (q.includes('speak to someone') || q.includes('speak to a person') || q.includes('call') || q.includes('human') || q.includes('jamie') || q.includes('phone')) {
    return "You can speak directly with our team right now! Please call us at (705) 313-6321. We are available 24/7 for urgent calls and ready to answer your questions. You can also chat with us on WhatsApp at https://wa.me/17053136321.";
  }

  if (q.includes('send you a picture') || q.includes('send a picture') || q.includes('photo') || q.includes('image')) {
    return "Yes! You can send photos of the affected area directly to our WhatsApp at https://wa.me/17053136321 (or call 705-313-6321). Our team can take a preliminary look and advise on next steps. Would you like to click our WhatsApp link?";
  }

  if (q.includes('bleach') || q.includes('diy') || q.includes('clean myself')) {
    return "We advise caution with DIY removal or bleach. Bleach doesn't penetrate porous materials like wood or drywall and can add unwanted moisture, while scrubbing dry mold releases airborne spores into your ventilation without negative-air containment. We recommend an inspection first. Can we assist with an assessment?";
  }

  if (q.includes('health') || q.includes('sick') || q.includes('toxic') || q.includes('black mold') || q.includes('dangerous')) {
    return "While we are environmental remediation specialists rather than doctors, mold spores and excess moisture can aggravate respiratory conditions and allergies. If you have health concerns, please consult a healthcare professional, and let EnviroTech handle safe containment and removal. Would you like an inspection scheduled?";
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good afternoon')) {
    return "Hello! Welcome to EnviroTech Mold Pros in Peterborough. How can we help you with mold removal, inspection, or water damage today?";
  }

  return "Thank you for reaching out! EnviroTech Mold Pros provides certified mold removal, inspection, and water damage cleanup in Peterborough and surrounding areas with a 100% satisfaction guarantee. To discuss your property, feel free to call our team directly at (705) 313-6321 or request a free consultation right here on the page.";
}

// In-memory consultations storage (for demo/lead capture)
interface ConsultationLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  address?: string;
  city?: string;
  details?: string;
  urgency?: string;
  createdAt: string;
}

const consultationLeads: ConsultationLead[] = [];

// API Route: AI Chatbot (/api/chat)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!aiClient) {
      const reply = getKnowledgeBaseResponse(message, history || []);
      res.json({ reply });
      return;
    }

    // Prepare contents for Gemini
    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user') {
          formattedContents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'assistant' || item.sender === 'model') {
          formattedContents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    formattedContents.push({ role: 'user', parts: [{ text: message }] });

    // Race against 7.5s timeout to ensure prompt responsiveness
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 7500);
    });

    const generatePromise = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: ENVIROTECH_SYSTEM_PROMPT,
        temperature: 0.6,
      },
    });

    const result = await Promise.race([generatePromise, timeoutPromise]);

    if (!result || !result.text) {
      const fallbackReply = getKnowledgeBaseResponse(message, history || []);
      res.json({ reply: fallbackReply });
      return;
    }

    res.json({ reply: result.text });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal error';
    console.error('Chat error:', errorMessage);
    const fallback = getKnowledgeBaseResponse(req.body.message || '', req.body.history || []);
    res.json({ reply: fallback });
  }
});

// API Route: Voice AI Agent (/api/voice)
app.post('/api/voice', async (req: Request, res: Response) => {
  try {
    const { text, history } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Voice input text is required' });
      return;
    }

    const fallbackText = getKnowledgeBaseResponse(text, history || []);

    if (!aiClient) {
      res.json({
        replyText: fallbackText,
        audioBase64: null,
      });
      return;
    }

    const voiceSystemPrompt = `${ENVIROTECH_SYSTEM_PROMPT}
Special instruction for voice mode:
- Keep responses conversational, concise, natural, and clear (1 to 2 short sentences).
- Avoid bullet points, symbols, markdown, or complex URLs. Speak naturally as if answering an inquiry over the phone.
- Answer first, then offer a clear next step (e.g. scheduling a free inspection or calling Jamie at 705-313-6321).
`;

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-4)) {
        if (item.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'assistant' || item.sender === 'model') {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text }] });

    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 6000));

    const generatePromise = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: voiceSystemPrompt,
        temperature: 0.6,
      },
    });

    const textResult = await Promise.race([generatePromise, timeoutPromise]);
    const replyText = textResult?.text || fallbackText;

    // Optional TTS generation
    let audioBase64: string | null = null;
    try {
      const ttsTimeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));
      const ttsPromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: replyText,
                speechMetadata: {
                  style: 'Warm, calm, professional customer support specialist',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const ttsResult = await Promise.race([ttsPromise, ttsTimeout]);
      audioBase64 = ttsResult?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    } catch {
      audioBase64 = null;
    }

    res.json({ replyText, audioBase64 });
  } catch (err: unknown) {
    const fallbackText = getKnowledgeBaseResponse(req.body.text || '', req.body.history || []);
    res.json({ replyText: fallbackText, audioBase64: null });
  }
});

// API Route: Free Consultation Lead Submission (/api/consultation)
app.post('/api/consultation', (req: Request, res: Response) => {
  const { name, phone, email, service, address, city, details, urgency } = req.body;

  if (!name || !phone) {
    res.status(400).json({ error: 'Name and phone number are required.' });
    return;
  }

  const newLead: ConsultationLead = {
    id: `ENV-${Date.now().toString().slice(-6)}`,
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: email ? String(email).trim() : undefined,
    service: service || 'Mold Inspection / Removal',
    address: address ? String(address).trim() : undefined,
    city: city ? String(city).trim() : 'Peterborough Area',
    details: details ? String(details).trim() : undefined,
    urgency: urgency || 'Standard',
    createdAt: new Date().toISOString(),
  };

  consultationLeads.push(newLead);
  console.log(`[EnviroTech Consultation Request Received] Lead ID: ${newLead.id}`, newLead);

  res.status(201).json({
    success: true,
    message: 'Consultation request received successfully.',
    referenceId: newLead.id,
    lead: newLead,
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EnviroTech Mold Pros server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
