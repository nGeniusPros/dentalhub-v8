import React from 'react';
import * as Icons from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';
import { motion } from 'framer-motion';

export const KPIOverview: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <StatsCard
        title="Monthly Revenue"
        value="$145,678"
        change={8}
        icon="dollar-sign"
        variant="primary"
        className="bg-gradient-to-br from-navy to-navy-light"
      />
      <StatsCard
        title="Appointments"
        value="1,234"
        change={-3}
        icon="calendar"
        variant="secondary"
        className="bg-gradient-to-br from-gold to-gold-light"
      />
      <StatsCard
        title="New Patients"
        value="89"
        change={12}
        icon="users"
        variant="accent1"
        className="bg-gradient-to-br from-turquoise to-turquoise-light"
      />
      <StatsCard
        title="Treatment Plans"
        value="245"
        change={5}
        icon="file-text"
        variant="accent2"
        className="bg-gradient-to-br from-purple to-purple-light"
      />
    </motion.div>
  );
};

export default KPIOverview;