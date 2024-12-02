'use client'

import useAuthToken from '@/hooks/useAuthToken'

const DashboardPage = () => {
  useAuthToken()

  return (
    <div>
      <div>DashboardPage</div>
    </div>
  )
}

export default DashboardPage
