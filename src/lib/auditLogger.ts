import { supabase } from '@/lib/supabaseClient'

type AuditEvent = {
  action: 'campaign_create' | 'campaign_update'
  details: Record<string, unknown>
  userId: string
}

export const logAuditEvent = async (event: AuditEvent) => {
  await supabase.from('audit_logs').insert({
    action: event.action,
    details: event.details,
    user_id: event.userId,
    ip_address: '', // Populate from request context in backend
  })
}
