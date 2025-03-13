import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { VERIFY_TOKEN } from '@renderer/graphql/auth'

type PrivateRouteProps = {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const [verifyTokenMutation] = useMutation(VERIFY_TOKEN)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      try {
        await verifyTokenMutation({ variables: { token } })
        setIsAuthenticated(true)
      } catch (error) {
        navigate('/login')
      }
    }
    checkAuth()
  }, [navigate])

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}

export default PrivateRoute
