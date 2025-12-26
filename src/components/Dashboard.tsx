import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { SalesChart } from './SalesChart';
import { InventoryTable } from './InventoryTable';

export const Dashboard = () => {
  const metrics = [
    { title: 'Total Revenue', value: '$37,200', change: 12.5, icon: DollarSign },
    { title: 'Orders This Week', value: '233', change: 8.2, icon: ShoppingCart },
    { title: 'Active Customers', value: '1,847', change: 5.3, icon: Users },
    { title: 'Products Low Stock', value: '3', change: -15.0, icon: Package },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Insights</h3>
          <div className="space-y-4">
            <InsightItem
              title="Peak Sales Day"
              value="Saturday"
              subtext="52 orders, $7,800 revenue"
            />
            <InsightItem
              title="Avg Order Value"
              value="$159.74"
              subtext="↑ 7.2% from last week"
            />
            <InsightItem
              title="Returning Customers"
              value="34%"
              subtext="of orders this week"
            />
            <InsightItem
              title="Inventory Turnover"
              value="4.2x"
              subtext="Monthly average"
            />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <InventoryTable />
    </div>
  );
};

const InsightItem = ({ title, value, subtext }: { title: string; value: string; subtext: string }) => (
  <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
    <p className="text-xs text-muted-foreground mb-1">{title}</p>
    <p className="text-xl font-semibold text-foreground font-mono">{value}</p>
    <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>
  </div>
);
