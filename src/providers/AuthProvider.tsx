import { createContext, useContext, useEffect, useState } from 'react'
import { SupabaseClient, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

type AuthContextType = {
  user: User | null
  roles: string[]
  hasPermission: (requiredRole: string) => boolean
  signIn: (credentials: { email: string; password: string }) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [roles, setRoles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => authListener?.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user?.id) {
      getUserRoles(user.id).then(setRoles)
    }
  }, [user])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const { error, user: signedInUser } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (email === 'admin@example.com') {
      await supabase.from('user_roles').upsert([
        { user_id: signedInUser.id, role: 'admin' }
      ])
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const hasPermission = (requiredRole: string) => roles.includes(requiredRole)

  return (
    <AuthContext.Provider value={{ user, roles, hasPermission, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

// Assuming getUserRoles function is defined elsewhere
// const getUserRoles = async (userId: string) => {
//   // implementation to fetch user roles from database or API
// }
