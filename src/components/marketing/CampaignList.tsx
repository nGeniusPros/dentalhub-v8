import { useQuery } from '@tanstack/react-query'
import { fetchCampaigns } from '@/lib/instantlyClient'
import { Skeleton } from '@/components/ui/skeleton'

export default function CampaignList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
    retry: 2
  })

  if (error) return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg">
      Error loading campaigns: {error.message}
    </div>
  )

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-navy">Active Campaigns</h3>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-[56px] w-full" />
          <Skeleton className="h-[56px] w-full" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm divide-y">
          {data?.map(campaign => (
            <div key={campaign.campaign_id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-medium">{campaign.name}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
