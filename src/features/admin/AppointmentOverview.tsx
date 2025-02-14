import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';

interface Appointment {
  id: string;
  patientName: string;
  type: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
}

const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Smith',
    type: 'Cleaning',
    time: '9:00 AM',
    status: 'completed'
  },
  {
    id: '2',
    patientName: 'Sarah Wilson',
    type: 'Root Canal',
    time: '10:30 AM',
    status: 'scheduled'
  },
  {
    id: '3',
    patientName: 'Mike Johnson',
    type: 'Consultation',
    time: '11:45 AM',
    status: 'scheduled'
  },
  {
    id: '4',
    patientName: 'Emma Davis',
    type: 'Crown Fitting',
    time: '2:15 PM',
    status: 'cancelled'
  },
  {
    id: '5',
    patientName: 'James Wilson',
    type: 'Cleaning',
    time: '3:30 PM',
    status: 'scheduled'
  }
];

const stats = [
  {
    label: 'Total Appointments',
    value: '32',
    icon: <Icons.Calendar className="w-4 h-4" />,
    change: '+8%'
  },
  {
    label: 'Completion Rate',
    value: '92%',
    icon: <Icons.CheckCircle className="w-4 h-4" />,
    change: '+3%'
  },
  {
    label: 'No-Show Rate',
    value: '4.8%',
    icon: <Icons.XCircle className="w-4 h-4" />,
    change: '-2%'
  }
];

const getStatusColor = (status: Appointment['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green bg-opacity-10 text-green';
    case 'scheduled':
      return 'bg-blue bg-opacity-10 text-blue';
    case 'cancelled':
      return 'bg-purple bg-opacity-10 text-purple';
    case 'no-show':
      return 'bg-gold bg-opacity-10 text-gold';
    default:
      return 'bg-gray-light text-gray-darker';
  }
};

export const AppointmentOverview: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Appointment Overview</h2>
          <p className="text-sm text-gray-500">Today's schedule and statistics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icons.Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-lighter"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-darker">{stat.label}</span>
              <span className="p-2 bg-white rounded-full">{stat.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green' : 'text-purple'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Today's Appointments</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-light hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-navy bg-opacity-10 flex items-center justify-center">
                  <Icons.User className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                  <p className="text-sm text-gray-500">{appointment.type} • {appointment.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
                <Button variant="ghost" size="sm">
                  <Icons.MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentOverview;