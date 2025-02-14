import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const lineChartData = [
  { month: 'Jan', revenue: 120000, expenses: 80000, profit: 40000 },
  { month: 'Feb', revenue: 125000, expenses: 82000, profit: 43000 },
  { month: 'Mar', revenue: 130000, expenses: 85000, profit: 45000 },
  { month: 'Apr', revenue: 128000, expenses: 83000, profit: 45000 },
  { month: 'May', revenue: 135000, expenses: 86000, profit: 49000 },
  { month: 'Jun', revenue: 140000, expenses: 88000, profit: 52000 },
];

const pieChartData = [
  { name: 'General Dentistry', value: 45, color: '#4BC5BD' },
  { name: 'Orthodontics', value: 25, color: '#6B4C9A' },
  { name: 'Cosmetic', value: 20, color: '#C5A572' },
  { name: 'Implants', value: 10, color: '#1B2B5B' },
];

export const RevenueAnalytics: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Revenue Analytics</h2>
          <p className="text-sm text-gray-500">Financial performance overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icons.FileText className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis dataKey="month" stroke="#6C757D" />
              <YAxis stroke="#6C757D" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4BC5BD"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#C5A572"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">Revenue by Service</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueAnalytics;