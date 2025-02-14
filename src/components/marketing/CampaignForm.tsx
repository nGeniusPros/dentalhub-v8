import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { campaignSchema } from '@/lib/validators/campaign'
import { createCampaign } from '@/services/instantly'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/providers/AuthProvider'
import { logAuditEvent } from '@/lib/auditLogger'

export default function CampaignForm() {
  const { toast } = useToast()
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(campaignSchema)
  })

  const onSubmit = async (data: unknown) => {
    try {
      await createCampaign(data)
      await logAuditEvent({
        action: 'campaign_create',
        details: { campaign_name: data.name },
        userId: user?.id ?? 'unknown'
      })
      toast({
        title: 'Campaign Created',
        description: 'Your marketing campaign has been successfully scheduled',
        variant: 'success'
      })
    } catch (error) {
      toast({
        title: 'Campaign Error',
        description: error instanceof Error ? error.message : 'Failed to create campaign',
        variant: 'destructive'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-darker mb-1">
          Campaign Name
        </label>
        <input
          {...register('name')}
          className={`w-full rounded-lg border ${
            errors.name ? 'border-red-500' : 'border-gray-light'
          } p-3`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-darker mb-1">
          Recipient Emails
        </label>
        <textarea
          {...register('recipientList')}
          className={`w-full rounded-lg border ${
            errors.recipientList ? 'border-red-500' : 'border-gray-light'
          } p-3 h-32`}
          placeholder="Enter one email per line"
        />
        {errors.recipientList && (
          <p className="text-red-500 text-sm mt-1">
            {errors.recipientList.message as string}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-navy text-white py-3 px-6 rounded-lg hover:bg-navy-light transition-colors disabled:bg-gray-300"
      >
        {isSubmitting ? 'Scheduling...' : 'Schedule Campaign'}
      </button>
    </form>
  )
}
