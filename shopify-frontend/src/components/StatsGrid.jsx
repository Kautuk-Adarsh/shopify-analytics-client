import { Users, ShoppingBag, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default function StatsGrid({ stats }) {
  const { totalCustomers = 0, totalOrders = 0, totalRevenue = "0.00" } = stats || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Revenue" 
        value={`$${totalRevenue}`} 
        icon={DollarSign} 
        color="bg-blue-500" 
      />
      <StatCard 
        title="Total Orders" 
        value={totalOrders} 
        icon={ShoppingBag} 
        color="bg-purple-500" 
      />
      <StatCard 
        title="Total Customers" 
        value={totalCustomers} 
        icon={Users} 
        color="bg-green-500" 
      />
    </div>
  );
}