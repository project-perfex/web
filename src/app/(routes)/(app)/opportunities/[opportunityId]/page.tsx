'use client'

import { useEffect, useState } from 'react'

import { Opportunities } from '@/modules/opportunities/types/opportunities'
import { getOpportunityById } from '@/modules/opportunities/services/opportunities'

import { OpportunityForm } from './components/opporturnity-form'

interface OpportunityIdPageProps {
  params: {
    opportunityId: string
  }
}

const OpportunityIdPage = ({ params }: OpportunityIdPageProps) => {
  const [opporturnity, setOpporturnity] = useState<Opportunities | null>(null)

  useEffect(() => {
    const fetchOpportunity = async () => {
      const data = await getOpportunityById(params.opportunityId)
      setOpporturnity(data)
    }

    fetchOpportunity()
  }, [params.opportunityId])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OpportunityForm initialData={opporturnity} />
      </div>
    </div>
  )
}

export default OpportunityIdPage
