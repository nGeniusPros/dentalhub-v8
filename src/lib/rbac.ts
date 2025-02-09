import { supabase } from '@/lib/supabaseClient'

export const checkUserRole = async (userId: string, requiredRole: 'admin' | 'marketing' | 'analyst') => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', requiredRole)

  if (error) throw error
  return data.length > 0
}

export const getUserRoles = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)

  if (error) throw error
  return data.map(r => r.role)
}
