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
import Button from '~/components/Button'
import { useIntl } from 'react-intl'
import Endpoints from '~/helpers/endpoints'

interface ActiveRouteProps {
  uid: string
}

const ActiveRoute: NextPage<ActiveRouteProps> = (props) => {
  const { formatMessage: f } = useIntl()
  const router = useRouter()
  const { id: queryId, title } = router.query
  const id = queryId.toString()

  const userStore = useUserStore()
  const { user, userLoading } = userStore
  const routeStore = useRouteStore()
  const locationStore = useLocationStore()
  const { currentRoute, loading: routeIsLoading } = routeStore

  const [currentStep, setCurrentStep] = useState<Step>()
  console.log('STEP', currentStep)
  useEffect(() => {
    if (id) {
      if (currentRoute?.uuid !== id) {
        routeStore.getRoute(
          id,
          () => {},
          () => {}
        )
      }
      console.log()
      if (!user) {
        userStore.getUser(props.uid)
      }
    }
    locationStore.watchPosition()
  }, [id])
  useEffect(() => {
    if (currentRoute && user) {
      const [isCleared, nextStepIndex] = userStore.getNextStep(id)
      if (!isCleared) {
        const step = routeStore.getStep(nextStepIndex)
        setCurrentStep(step)
      } else {
        const { href, as } = Endpoints.ROUTE_OVERVIEW(id)
        router.push(href, as)
      }
    }
  }, [currentRoute, user])
  useEffect(() => {
    return () => {
      locationStore.clearWatch()
    }
  }, [])
  console.log('LOADING', routeIsLoading, userLoading, user)
  return (
    <Layout padded>
      <RouteHeader />
      {routeIsLoading || !user ? (
        <LoadingSkeleton spesificRows={activeMapRouteSkeleton} />
      ) : (
        (() => {
          if (currentStep) {
            if (currentStep.type === 'RADAR')
              return <RadarStepComponent step={currentStep} routeId={id} />
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
