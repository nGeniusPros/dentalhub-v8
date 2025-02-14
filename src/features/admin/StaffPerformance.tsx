import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';

interface StaffMember {
  name: string;
  role: string;
  patients: number;
  satisfaction: number;
  revenue: number;
  avatar: string;
}

const staffData: StaffMember[] = [
  {
    name: 'Dr. Emily Parker',
    role: 'Lead Dentist',
    patients: 45,
    satisfaction: 98,
    revenue: 52000,
    avatar: '/avatars/emily.jpg'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Dentist',
    patients: 38,
    satisfaction: 96,
    revenue: 45000,
    avatar: '/avatars/michael.jpg'
  },
  {
    name: 'Sarah Johnson',
    role: 'Hygienist',
    patients: 42,
    satisfaction: 97,
    revenue: 28000,
    avatar: '/avatars/sarah.jpg'
  }
];

export const StaffPerformance: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Staff Performance</h2>
          <p className="text-sm text-gray-500">Monthly staff metrics</p>
        </div>
        <Button variant="outline" size="sm">
          <Icons.Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="space-y-4">
        {staffData.map((staff, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-light hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-lighter flex items-center justify-center">
                  <Icons.User className="w-6 h-6 text-gray-darker" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{staff.name}</h3>
                  <p className="text-sm text-gray-500">{staff.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icons.MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Patients</p>
                <p className="text-lg font-semibold text-navy">{staff.patients}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Satisfaction</p>
                <p className="text-lg font-semibold text-green">{staff.satisfaction}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-lg font-semibold text-purple">${staff.revenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-light">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Performance Score</span>
                <span className="text-sm font-medium text-green">
                  {Math.round((staff.satisfaction + (staff.patients / 50) * 100) / 2)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-lighter rounded-full mt-2">
                <div
                  className="h-full bg-gradient-to-r from-turquoise to-turquoise-light rounded-full"
                  style={{
                    width: `${Math.round((staff.satisfaction + (staff.patients / 50) * 100) / 2)}%`
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StaffPerformance;