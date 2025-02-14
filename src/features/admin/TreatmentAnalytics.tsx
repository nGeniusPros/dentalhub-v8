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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Treatment {
  name: string;
  count: number;
  success: number;
  revenue: number;
  color: string;
}

const treatmentData: Treatment[] = [
  {
    name: 'Cleanings',
    count: 245,
    success: 98,
    revenue: 24500,
    color: '#4BC5BD'
  },
  {
    name: 'Fillings',
    count: 180,
    success: 95,
    revenue: 36000,
    color: '#6B4C9A'
  },
  {
    name: 'Root Canals',
    count: 45,
    success: 92,
    revenue: 31500,
    color: '#C5A572'
  },
  {
    name: 'Crowns',
    count: 78,
    success: 96,
    revenue: 85800,
    color: '#1B2B5B'
  }
];

const monthlyTrends = [
  { month: 'Jan', success: 94 },
  { month: 'Feb', success: 95 },
  { month: 'Mar', success: 93 },
  { month: 'Apr', success: 96 },
  { month: 'May', success: 95 },
  { month: 'Jun', success: 97 }
];

export const TreatmentAnalytics: React.FC = () => {
  const totalTreatments = treatmentData.reduce((acc, curr) => acc + curr.count, 0);
  const averageSuccess = treatmentData.reduce((acc, curr) => acc + curr.success, 0) / treatmentData.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Treatment Analytics</h2>
          <p className="text-sm text-gray-500">Treatment success rates and trends</p>
        </div>
        <Button variant="outline" size="sm">
          <Icons.Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-gray-lighter">
          <h3 className="text-sm text-gray-500 mb-1">Total Treatments</h3>
          <p className="text-2xl font-semibold text-navy">{totalTreatments}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-lighter">
          <h3 className="text-sm text-gray-500 mb-1">Success Rate</h3>
          <p className="text-2xl font-semibold text-green">{averageSuccess.toFixed(1)}%</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-lighter">
          <h3 className="text-sm text-gray-500 mb-1">Total Revenue</h3>
          <p className="text-2xl font-semibold text-purple">
            ${treatmentData.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-4">Success Rate Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis dataKey="month" stroke="#6C757D" />
              <YAxis domain={[90, 100]} stroke="#6C757D" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="success"
                stroke="#4BC5BD"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">Treatment Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={treatmentData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
              >
                {treatmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6">
        <div className="space-y-3">
          {treatmentData.map((treatment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: treatment.color }}
                />
                <span className="text-sm text-gray-700">{treatment.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{treatment.count} treatments</span>
                <span className="text-sm font-medium text-green">{treatment.success}% success</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TreatmentAnalytics;