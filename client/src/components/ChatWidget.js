import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiMessageCircle, FiSend, FiX } from 'react-icons/fi';

const quickPrompts = [
  'What do you build?',
  'Are you available for work?',
  'How can we collaborate?',
];

const responses = [
  {
    keywords: ['build', 'do', 'work', 'skill', 'technology', 'tech'],
    answer: 'I build full-stack web apps, IoT projects, and renewable energy systems, bringing electrical engineering and software together.',
  },
  {
    keywords: ['available', 'hire', 'freelance', 'job', 'opportunity'],
    answer: 'Yes. I am open to full-time roles, freelance work, and thoughtful collaborations. Tell me what you are working on and I will get back to you within 24 hours.',
  },
  {
    keywords: ['collaborate', 'collaboration', 'contact', 'talk', 'reach', 'email'],
    answer: 'The best way to start is through the contact form. Share a little about your idea, timeline, and goals, and I will reply as soon as I can.',
  },
  {
    keywords: ['experience', 'internship'],
    answer: 'I have completed three internships and work across electrical engineering, full-stack development, IoT, and renewable energy. You can explore the details in the Experience section.',
  },
  {
    keywords: ['project', 'portfolio'],
    answer: 'You can browse selected work in the Projects section. I focus on practical products that connect software with real-world engineering problems.',
  },
];

const defaultResponse = 'I can help with questions about Sandesh\'s work, experience, availability, and collaboration. Try one of the prompts below, or send a message directly.';

function getResponse(message) {
  const normalizedMessage = message.toLowerCase();
  const match = responses.find(({ keywords }) => keywords.some(keyword => normalizedMessage.includes(keyword)));
  return match ? match.answer : defaultResponse;
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Hi, I\'m here to help you explore Sandesh\'s work. What would you like to know?' },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = (message = input) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setMessages(current => [
      ...current,
      { id: Date.now(), role: 'user', text: trimmedMessage },
      { id: Date.now() + 1, role: 'assistant', text: getResponse(trimmedMessage) },
    ]);
    setInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="fixed bottom-5 right-5 z-[150] sm:bottom-8 sm:right-8" aria-live="polite">
      {isOpen && (
        <section className="mb-3 flex h-[min(590px,calc(100vh-7rem))] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#0c0924]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl" aria-label="Portfolio assistant">
          <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <p className="text-sm font-bold text-white">Portfolio assistant</p>
              </div>
              <p className="mt-1 text-[11px] text-gray-500">Ask about work, experience, or availability</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Minimize chat" className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white">
              <FiChevronDown size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${message.role === 'user' ? 'rounded-br-md bg-cyan-300 text-[#071016]' : 'rounded-bl-md border border-white/10 bg-white/[0.06] text-gray-200'}`}>
                  {message.text}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-white/10 px-4 pb-4 pt-3">
            <div className="mb-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {quickPrompts.map(prompt => (
                <button key={prompt} type="button" onClick={() => sendMessage(prompt)} className="shrink-0 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[11px] font-semibold text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10">
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-1.5 focus-within:border-cyan-300/40">
              <input value={input} onChange={event => setInput(event.target.value)} placeholder="Write a question..." aria-label="Chat message" className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-gray-600" />
              <button type="submit" aria-label="Send message" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-[#071016] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40" disabled={!input.trim()}>
                <FiSend size={15} />
              </button>
            </form>
            <a href="#contact" onClick={() => setIsOpen(false)} className="mt-3 block text-center text-[11px] font-semibold text-gray-500 transition hover:text-cyan-200">Prefer a direct message? Go to contact form</a>
          </div>
        </section>
      )}

      <button type="button" onClick={() => setIsOpen(current => !current)} aria-label={isOpen ? 'Close chat' : 'Open portfolio assistant'} aria-expanded={isOpen} className="group ml-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200/40 bg-cyan-300 text-[#071016] shadow-[0_12px_32px_rgba(103,232,249,0.25)] transition hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-[0_16px_40px_rgba(103,232,249,0.35)]">
        {isOpen ? <FiX size={23} /> : <FiMessageCircle size={23} />}
        {!isOpen && <span className="pointer-events-none absolute bottom-full right-0 mb-3 w-max rounded-lg border border-white/10 bg-[#0c0924] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-xl transition group-hover:opacity-100">Ask about my work</span>}
      </button>
    </div>
  );
}

export default ChatWidget;