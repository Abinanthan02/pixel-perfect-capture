import { motion } from 'framer-motion';
import { AlertTriangle, Package, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const inventoryData = [
  { id: 1, name: 'Premium Wireless Headphones', sku: 'WH-001', stock: 12, threshold: 20, sales7d: 45, status: 'low' },
  { id: 2, name: 'Organic Cotton T-Shirt', sku: 'CT-042', stock: 156, threshold: 50, sales7d: 23, status: 'ok' },
  { id: 3, name: 'Stainless Steel Water Bottle', sku: 'WB-108', stock: 8, threshold: 25, sales7d: 67, status: 'critical' },
  { id: 4, name: 'Bluetooth Speaker Mini', sku: 'BS-022', stock: 89, threshold: 30, sales7d: 18, status: 'ok' },
  { id: 5, name: 'Laptop Stand Adjustable', sku: 'LS-015', stock: 24, threshold: 25, sales7d: 31, status: 'low' },
];

const getStatusBadge = (status: string) => {
  const styles = {
    critical: 'bg-destructive/10 text-destructive border-destructive/20',
    low: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
    ok: 'bg-primary/10 text-primary border-primary/20',
  };

  const labels = {
    critical: 'Critical',
    low: 'Low Stock',
    ok: 'In Stock',
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
      styles[status as keyof typeof styles]
    )}>
      {status === 'critical' && <AlertTriangle className="w-3 h-3" />}
      {labels[status as keyof typeof labels]}
    </span>
  );
};

export const InventoryTable = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Inventory Alerts</h3>
            <p className="text-sm text-muted-foreground">Products requiring attention</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingDown className="w-4 h-4 text-chart-4" />
            <span>3 items below threshold</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">SKU</th>
              <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock</th>
              <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">7-Day Sales</th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-muted-foreground">{item.sku}</span>
                </td>
                <td className="p-4 text-right">
                  <span className={cn(
                    "font-mono font-semibold",
                    item.status === 'critical' ? 'text-destructive' : 
                    item.status === 'low' ? 'text-chart-4' : 'text-foreground'
                  )}>
                    {item.stock}
                  </span>
                </td>
                <td className="p-4 text-right font-mono text-muted-foreground">
                  {item.sales7d}
                </td>
                <td className="p-4">
                  {getStatusBadge(item.status)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
