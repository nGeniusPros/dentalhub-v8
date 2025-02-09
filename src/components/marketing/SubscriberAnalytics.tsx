import { useQuery } from '@tanstack/react-query'
import { getSubscribers } from '@/lib/beehiivClient'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function SubscriberAnalytics() {
  const { data } = useQuery({
    queryKey: ['subscribers'],
    queryFn: getSubscribers
  })

  const chartData = [
    { name: 'Active', count: data?.filter(s => s.status === 'active').length || 0 },
    { name: 'Unsubscribed', count: data?.filter(s => s.status === 'unsubscribed').length || 0 },
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-navy mb-4">Subscriber Status</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#6C757D" />
            <YAxis stroke="#6C757D" />
            <Tooltip
              contentStyle={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}
              itemStyle={{ color: '#1B2B5B' }}
            />
            <Bar
              dataKey="count"
              fill="#C5A572"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
