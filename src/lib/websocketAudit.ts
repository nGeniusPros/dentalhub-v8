import { supabase } from '@/lib/supabaseClient'

export enum WSAuditType {
  CONNECT = 'connect',
  MESSAGE = 'message',
  ERROR = 'error'
}

export const logWSEvent = async (
  type: WSAuditType,
  metadata: Record<string, unknown>
) => {
  await supabase.from('ws_audit').insert({
    type,
    metadata,
    source_ip: '', // Populate from connection context
    user_id: '' // From JWT
  })
}
