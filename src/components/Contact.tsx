import { useState } from 'react';
import { FaTelegram, FaPaperPlane, FaEnvelope, FaUser, FaComments } from 'react-icons/fa';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const telegramUsername = 'heduga';
    const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const encodedText = encodeURIComponent(text);

    // Use tg:// protocol to open native Telegram app
    const telegramUrl = `tg://resolve?domain=${telegramUsername}&text=${encodedText}`;

    // Fallback for browsers that don't support tg://
    const fallbackUrl = `https://t.me/${telegramUsername}?text=${encodedText}`;

    // Simulate sending animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Try opening native app
    window.location.href = telegramUrl;

    // Optional: fallback after delay
    setTimeout(() => {
      window.open(fallbackUrl, '_blank');
    }, 1000);

    setIsSending(false);
    setIsSent(true);
    
    // Reset form after delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSent(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 contact-bg-pattern"></div>
      
      {/* Floating Messages */}
      <div className="floating-message top-20 left-10 animate-float-contact">Hello! 👋</div>
      <div className="floating-message top-40 right-20 animate-float-contact" style={{ animationDelay: '1s' }}>Let's talk 💬</div>
      <div className="floating-message bottom-40 left-20 animate-float-contact" style={{ animationDelay: '2s' }}>Get in touch 📧</div>
      <div className="floating-message bottom-20 right-10 animate-float-contact" style={{ animationDelay: '3s' }}>Available now ✅</div>

      {/* Telegram Waves */}
      <div className="telegram-wave top-1/4 left-1/4"></div>
      <div className="telegram-wave bottom-1/3 right-1/3" style={{ animationDelay: '2s' }}></div>
      <div className="telegram-wave top-1/3 right-1/4" style={{ animationDelay: '4s' }}></div>

      {/* Floating Icons */}
      <div className="absolute top-10 right-10 text-4xl text-blue-500 opacity-20 animate-float-contact">
        <FaTelegram />
      </div>
      <div className="absolute bottom-10 left-10 text-4xl text-purple-500 opacity-20 animate-float-contact" style={{ animationDelay: '1.5s' }}>
        <FaEnvelope />
      </div>
      <div className="absolute top-1/2 left-10 text-3xl text-cyan-500 opacity-20 animate-float-contact" style={{ animationDelay: '2.5s' }}>
        <FaComments />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white animate-pulse-contact">
              <FaTelegram className="text-3xl" />
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Send me a message directly through Telegram
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border-2 border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaUser />
              </div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="contact-input w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-300"
                required
                disabled={isSending}
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="contact-input w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-300"
                required
                disabled={isSending}
              />
            </div>

            {/* Message Input */}
            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-400">
                <FaComments />
              </div>
              <textarea
                placeholder="Your Message... Tell me about your project or just say hello!"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="contact-input w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-300 resize-none"
                required
                disabled={isSending}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending}
              className={`send-button group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 ${
                isSending 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : isSent
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
              }`}
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  <span className="animate-typing-dots">
                    Sending<span>.</span><span>.</span><span>.</span>
                  </span>
                </>
              ) : isSent ? (
                <>
                  <FaPaperPlane className="text-xl" />
                  Message Sent!
                </>
              ) : (
                <>
                  <FaTelegram className="text-xl group-hover:scale-110 transition-transform" />
                  Send via Telegram
                </>
              )}
              
              {/* Send Animation */}
              {isSending && (
                <div className="absolute right-4 text-white animate-send-plane">
                  <FaPaperPlane />
                </div>
              )}
            </button>
          </form>

          {/* Alternative Contact */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Or contact me through other methods
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="mailto:dddheni62@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              >
                <FaEnvelope />
                Email
              </a>
              <a
                href="https://t.me/heduga"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300"
              >
                <FaTelegram />
                Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {isSent && (
          <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-2xl text-green-700 dark:text-green-300 text-center animate-pulse-contact">
            ✅ Message sent successfully! Opening Telegram...
          </div>
        )}
      </div>
    </section>
  );
}