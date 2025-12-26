import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, User, Loader2, BarChart3, Package, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

const suggestedQuestions = [
  { icon: TrendingUp, text: "What were my top 5 selling products last week?" },
  { icon: Package, text: "Which products are likely to go out of stock in 7 days?" },
  { icon: BarChart3, text: "How much inventory should I reorder based on last 30 days sales?" },
];

const mockResponses: Record<string, string> = {
  "what were my top 5 selling products last week?": `Based on your sales data from the past 7 days, here are your **top 5 best-selling products**:

1. **Premium Wireless Headphones** - 156 units sold ($15,600 revenue)
2. **Organic Cotton T-Shirt** - 142 units sold ($4,260 revenue)
3. **Stainless Steel Water Bottle** - 98 units sold ($2,450 revenue)
4. **Bluetooth Speaker Mini** - 87 units sold ($6,960 revenue)
5. **Laptop Stand Adjustable** - 76 units sold ($3,040 revenue)

📈 **Key Insight**: Your wireless headphones continue to dominate sales, generating 48% of your weekly revenue. Consider increasing stock levels.`,

  "which products are likely to go out of stock in 7 days?": `I've analyzed your current inventory levels against sales velocity. Here are products at risk of stockout within 7 days:

⚠️ **Critical Risk (Will stockout in 3-4 days)**:
- **Stainless Steel Water Bottle** - 8 units left, selling ~10/day
- **Premium Wireless Headphones** - 12 units left, selling ~22/day

🟡 **Moderate Risk (Will stockout in 5-7 days)**:
- **Laptop Stand Adjustable** - 24 units left, selling ~4/day

📊 **Recommendation**: Place urgent restock orders for the water bottles and headphones immediately. I estimate you'll need at least 150 headphones and 70 bottles to cover the next 2 weeks.`,

  "how much inventory should i reorder based on last 30 days sales?": `Based on your 30-day sales velocity and maintaining a 2-week safety stock buffer, here's my reorder recommendation:

| Product | 30-Day Sales | Current Stock | Reorder Qty |
|---------|--------------|---------------|-------------|
| Wireless Headphones | 540 | 12 | **600 units** |
| Cotton T-Shirt | 380 | 156 | **300 units** |
| Water Bottle | 290 | 8 | **350 units** |
| Bluetooth Speaker | 245 | 89 | **200 units** |
| Laptop Stand | 120 | 24 | **150 units** |

💰 **Estimated reorder cost**: $24,500
📦 **Lead time consideration**: If your supplier has 5-day lead time, prioritize the headphones and water bottles today.`,
};

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI analytics assistant. Ask me anything about your store's performance, inventory, sales trends, or customer behavior. I'll analyze your Shopify data and provide actionable insights.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerText = messageText.toLowerCase();
      let responseText = "I'd be happy to help you analyze that! Let me query your Shopify data...\n\nBased on my analysis, I can see some interesting patterns in your store data. Would you like me to dive deeper into any specific metric?";
      
      for (const [key, value] of Object.entries(mockResponses)) {
        if (lowerText.includes(key.slice(0, 30)) || key.includes(lowerText.slice(0, 30))) {
          responseText = value;
          break;
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center glow-effect">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI Analytics Assistant</h2>
          <p className="text-sm text-muted-foreground">Ask questions about your store data in natural language</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card'
                )}
              >
                <p className={cn(
                  "text-sm whitespace-pre-wrap",
                  message.role === 'assistant' && 'text-foreground prose prose-invert prose-sm max-w-none'
                )}>
                  {message.content}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="glass-card px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground">Analyzing your data...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 mb-4"
        >
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <Button
                key={i}
                variant="glass"
                size="sm"
                onClick={() => handleSend(q.text)}
                className="text-xs"
              >
                <q.icon className="w-3 h-3 mr-1" />
                {q.text}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="relative mt-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about inventory, sales trends, customer behavior..."
          className="w-full h-14 pl-4 pr-14 py-4 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
          rows={1}
        />
        <Button
          size="icon"
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};
