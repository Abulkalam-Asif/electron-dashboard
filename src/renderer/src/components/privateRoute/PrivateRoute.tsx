import React, { useEffect, useState } from 'react'
import { verifyJwt } from '../../utils/verifyJwt'
import { useNavigate } from 'react-router-dom'

type PrivateRouteProps = {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      try {
        await verifyJwt(token)
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
