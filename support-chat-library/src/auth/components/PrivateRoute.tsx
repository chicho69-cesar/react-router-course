import type { ReactNode } from 'react'
import { Navigate } from 'react-router'

interface Props {
  isAuthenticated: boolean,
  children: ReactNode
}

export function PrivateRoute({ children, isAuthenticated }: Props) {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }
  
  return children
}
