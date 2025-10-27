import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

interface WhatsAppChatProps {
  phoneNumber: string; // Format: 31612345678 (country code + number without +)
}

export function WhatsAppChat({ phoneNumber }: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (message?: string) => {
    const defaultMessage = message || "Hi! I'm interested in Quality Hair's Organic Keratin Treatment. Can you help me?";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const quickMessages = [
    "I have questions about the product",
    "How do I choose the right size?",
    "Is it safe during pregnancy?",
    "I need help with my order",
  ];

  return (
    <>
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
            />

            {/* Chat Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-24 right-4 md:right-6 w-[340px] bg-background border-2 border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <div className="font-semibold">Quality Hair Support</div>
                      <div className="text-xs text-green-100">Typically replies instantly</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 bg-gradient-to-b from-green-50/50 to-background">
                <div className="bg-white border border-border rounded-lg p-3 mb-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">
                    Hi there! 👋 How can we help you today?
                  </p>
                </div>

                {/* Quick Messages */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground mb-2">Quick Messages:</p>
                  {quickMessages.map((message, index) => (
                    <button
                      key={index}
                      onClick={() => openWhatsApp(message)}
                      className="w-full text-left p-3 bg-white hover:bg-accent border border-border rounded-lg text-sm transition-colors"
                    >
                      {message}
                    </button>
                  ))}
                </div>

                {/* Open WhatsApp Button */}
                <Button
                  onClick={() => openWhatsApp()}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Open WhatsApp Chat
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-6 h-14 w-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Dot */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          />
        )}
      </motion.button>
    </>
  );
}
