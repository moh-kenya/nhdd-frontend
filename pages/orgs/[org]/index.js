import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function ConceptsList() {
  const router = useRouter()
  const {org} = router.query
  useEffect(() => {
    router.push(`/orgs/${org}/sources`)
  }, [])
  return (
    <div>Loading...</div>
  )
}

export default ConceptsList