import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  delay?: number;
}

export const MetricCard = ({ title, value, change, icon: Icon, delay = 0 }: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
          isPositive 
            ? "bg-primary/10 text-primary" 
            : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div>
        <p className="text-muted-foreground text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground font-mono tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
};
