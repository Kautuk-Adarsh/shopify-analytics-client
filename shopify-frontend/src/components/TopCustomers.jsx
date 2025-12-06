import { User } from 'lucide-react';

export default function TopCustomers({ customers }) {
  if (!customers || customers.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        No customer data found
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {customers.map((customer) => (
            <tr key={customer.shopifyId} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {(customer.firstName?.[0] || '') + (customer.lastName?.[0] || '') || <User size={14} />}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-xs text-gray-400">{customer.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-right text-sm text-gray-500">
                {customer.city || 'N/A'}
              </td>
              <td className="py-3 px-4 text-right text-sm font-bold text-gray-900">
                ${parseFloat(customer.totalSpent).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}