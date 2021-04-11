import React, { useEffect, useState } from 'react'

import { NextPage, NextPageContext } from 'next'
import { observer } from 'mobx-react-lite'
import Layout from '~/components/Layout'
import LoadingSkeleton from '~/components/LoadingSkeleton'
import { activeMapRouteSkeleton } from '~/helpers/skeletons'
import RouteHeader from '~/components/RouteHeader'
import { useRouter } from 'next/router'
import Map from '~/components/Map'
import CodeStepComponent from '~/components/StepComponent/CodeStepComponent'
import RadarStepComponent from '~/components/StepComponent/RadarStepComponent'
import { useLocationStore, useRouteStore, useUserStore } from '~/helpers/stores'
import { rerouteOnUnauthorized } from '~/helpers/validation'

interface ActiveRouteProps {
  uid: string
}

const ActiveRoute: NextPage<ActiveRouteProps> = (props) => {
  const router = useRouter()
  const { id, title } = router.query
  const userStore = useUserStore()
  const { user, userLoading } = userStore
  console.log('user', props)
  const routeStore = useRouteStore()
  const locationStore = useLocationStore()
  const { currentRoute, loading: routeIsLoading } = routeStore

  const [currentStep, setCurrentStep] = useState<Step>()
  useEffect(() => {
    if (id) {
      if (currentRoute?.uuid !== id) {
        routeStore.getRoute(id.toString())
      }
      if (!user) {
        userStore.getUser(props.uid)
      }
    }
    locationStore.watchPosition()
  }, [id])
  useEffect(() => {
    if (currentRoute && user) {
      const nextStepIndex = 0
      const step = routeStore.getStep(nextStepIndex)
      setCurrentStep(step)
    }
  }, [currentRoute, user])
  return (
    <Layout padded>
      <RouteHeader />
      {routeIsLoading || userLoading ? (
        <LoadingSkeleton spesificRows={activeMapRouteSkeleton} />
      ) : (
        (() => {
          if (currentStep) {
            if (currentStep.type === 'RADAR')
              return <RadarStepComponent step={currentStep} />
            else return <CodeStepComponent step={currentStep} />
          }
          return null
        })()
      )}
    </Layout>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const props = await rerouteOnUnauthorized(ctx)
  return {
    ...props,
    props: {
      ...props.props,
      id: ctx.query.id.toString(),
    },
  }
}

export default observer(ActiveRoute)
