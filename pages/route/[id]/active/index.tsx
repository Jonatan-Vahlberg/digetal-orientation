import React from 'react'

import { NextPage } from 'next'
import { observer } from 'mobx-react-lite'
import Layout from '~/components/Layout'
import LoadingSkeleton from '~/components/LoadingSkeleton'
import { activeMapRouteSkeleton } from '~/helpers/skeletons'
import RouteHeader from '~/components/RouteHeader'
import { useRouter } from 'next/router'

interface ActiveRouteProps {}

const ActiveRoute: NextPage<ActiveRouteProps> = () => {
  const router = useRouter()
  const { id, title } = router.query
  return (
    <Layout padded>
      <RouteHeader />
      <LoadingSkeleton spesificRows={activeMapRouteSkeleton} />
    </Layout>
  )
}

export default observer(ActiveRoute)