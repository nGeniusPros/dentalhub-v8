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

interface MarketingChannel {
  name: string;
  leads: number;
  conversion: number;
  cost: number;
  icon: JSX.Element;
}

const channelData: MarketingChannel[] = [
  {
    name: 'Patient Referrals',
    leads: 85,
    conversion: 65,
    cost: 25,
    icon: <Icons.Users className="w-4 h-4" />,
  },
  {
    name: 'Google Ads',
    leads: 120,
    conversion: 45,
    cost: 1200,
    icon: <Icons.Search className="w-4 h-4" />,
  },
  {
    name: 'Social Media',
    leads: 95,
    conversion: 38,
    cost: 800,
    icon: <Icons.Share2 className="w-4 h-4" />,
  },
  {
    name: 'Email Campaigns',
    leads: 65,
    conversion: 52,
    cost: 400,
    icon: <Icons.Mail className="w-4 h-4" />,
  },
];

const performanceData = channelData.map(channel => ({
  name: channel.name,
  leads: channel.leads,
  conversion: channel.conversion,
}));

export const MarketingMetrics: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Marketing Performance</h2>
          <p className="text-sm text-gray-500">Channel effectiveness and ROI</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icons.TrendingUp className="w-4 h-4 mr-2" />
            View Trends
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {channelData.map((channel, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-lighter"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-full">
                {channel.icon}
              </div>
              <span className="font-medium text-gray-900">{channel.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Leads</p>
                <p className="text-lg font-semibold text-navy">{channel.leads}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Conversion</p>
                <p className="text-lg font-semibold text-green">{channel.conversion}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cost/Lead</p>
                <p className="text-lg font-semibold text-purple">
                  ${Math.round(channel.cost / channel.leads)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
            <XAxis dataKey="name" stroke="#6C757D" />
            <YAxis stroke="#6C757D" />
            <Tooltip />
            <Bar
              dataKey="leads"
              fill="#4BC5BD"
              radius={[4, 4, 0, 0]}
              name="Leads"
            />
            <Bar
              dataKey="conversion"
              fill="#C5A572"
              radius={[4, 4, 0, 0]}
              name="Conversion Rate"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MarketingMetrics;