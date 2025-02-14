import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface HygienistPerformance {
  name: string;
  patients: number;
  satisfaction: number;
  efficiency: number;
}

const performanceData = [
  { month: 'Jan', cleanings: 180, referrals: 45 },
  { month: 'Feb', cleanings: 200, referrals: 52 },
  { month: 'Mar', cleanings: 185, referrals: 48 },
  { month: 'Apr', cleanings: 210, referrals: 55 },
  { month: 'May', cleanings: 195, referrals: 50 },
  { month: 'Jun', cleanings: 220, referrals: 58 },
];

const hygienistData: HygienistPerformance[] = [
  {
    name: 'Sarah Johnson',
    patients: 220,
    satisfaction: 98,
    efficiency: 95,
  },
  {
    name: 'Michael Brown',
    patients: 185,
    satisfaction: 96,
    efficiency: 92,
  },
  {
    name: 'Emily Davis',
    patients: 195,
    satisfaction: 97,
    efficiency: 94,
  },
];

const metrics = [
  {
    label: 'Monthly Cleanings',
    value: '620',
    change: '+8%',
    icon: <Icons.Sparkles className="w-4 h-4" />,
  },
  {
    label: 'Patient Satisfaction',
    value: '97%',
    change: '+2%',
    icon: <Icons.ThumbsUp className="w-4 h-4" />,
  },
  {
    label: 'Referral Rate',
    value: '25%',
    change: '+5%',
    icon: <Icons.UserPlus className="w-4 h-4" />,
  },
];

export const HygieneAnalytics: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Hygiene Analytics</h2>
          <p className="text-sm text-gray-500">Hygiene department performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icons.Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-lighter"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-darker">{metric.label}</span>
              <span className="p-2 bg-white rounded-full">{metric.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green' : 'text-purple'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-4">Performance Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
            <XAxis dataKey="month" stroke="#6C757D" />
            <YAxis stroke="#6C757D" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="cleanings"
              stroke="#4BC5BD"
              fill="#4BC5BD"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="referrals"
              stroke="#C5A572"
              fill="#C5A572"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Hygienist Performance</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {hygienistData.map((hygienist, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-gray-light hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-turquoise bg-opacity-10 flex items-center justify-center">
                    <Icons.User className="w-5 h-5 text-turquoise" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{hygienist.name}</h4>
                    <p className="text-sm text-gray-500">{hygienist.patients} patients this month</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icons.MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Satisfaction</span>
                    <span className="text-sm font-medium text-green">{hygienist.satisfaction}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-lighter rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-green to-green-light rounded-full"
                      style={{ width: `${hygienist.satisfaction}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Efficiency</span>
                    <span className="text-sm font-medium text-turquoise">{hygienist.efficiency}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-lighter rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-turquoise to-turquoise-light rounded-full"
                      style={{ width: `${hygienist.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HygieneAnalytics;
