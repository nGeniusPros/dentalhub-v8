import { ProtectedRoute } from '@/components/ProtectedRoute'
import CampaignList from '@/components/marketing/CampaignList'
import SubscriberAnalytics from '@/components/marketing/SubscriberAnalytics'

export default function MarketingPage() {
  return (
    <ProtectedRoute>
      <div className="p-8 space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <CampaignList />
          <SubscriberAnalytics />
        </div>
        
        {/* Add New Campaign Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-navy mb-4">Create New Campaign</h2>
          {/* Campaign form implementation here */}
        </div>
      </div>
    </ProtectedRoute>
  )
}
