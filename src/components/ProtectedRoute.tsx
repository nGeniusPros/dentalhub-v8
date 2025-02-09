import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'

export default function ProtectedRoute({ children, requiredRole }: {
  children: JSX.Element
  requiredRole?: 'admin' | 'marketing' | 'analyst'
}) {
  const { user, roles, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) navigate('/login')
    if (!loading && requiredRole && !roles.includes(requiredRole)) {
      navigate('/unauthorized')
    }
  }, [user, loading, roles, requiredRole, navigate])

  return children
}
