import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const patientData = [
  { age: '18-24', count: 245, growth: 15 },
  { age: '25-34', count: 432, growth: 22 },
  { age: '35-44', count: 387, growth: 18 },
  { age: '45-54', count: 325, growth: 12 },
  { age: '55-64', count: 278, growth: 8 },
  { age: '65+', count: 196, growth: 5 },
];

const metrics = [
  {
    label: 'New Patients',
    value: '245',
    change: '+12%',
    icon: <Icons.UserPlus className="w-4 h-4" />,
  },
  {
    label: 'Patient Retention',
    value: '87%',
    change: '+3%',
    icon: <Icons.Users className="w-4 h-4" />,
  },
  {
    label: 'Avg. Visit Frequency',
    value: '2.4',
    change: '+5%',
    icon: <Icons.CalendarCheck className="w-4 h-4" />,
  },
];

export const PatientMetrics: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Patient Metrics</h2>
          <p className="text-sm text-gray-500">Patient demographics and growth</p>
        </div>
        <Button variant="outline" size="sm">
          <Icons.Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-lighter rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-darker">{metric.label}</span>
              <span className="p-2 bg-white rounded-full">{metric.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green' : 'text-red-500'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Patient Age Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={patientData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
            <XAxis dataKey="age" stroke="#6C757D" />
            <YAxis stroke="#6C757D" />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#4BC5BD"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PatientMetrics;