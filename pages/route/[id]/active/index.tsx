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

// const codeData: CodeData = {
//   node: {
//     vertices: [
//       { lat: 69.2851255144915, lng: 11.038505839647919 },
//       { lat: 69.28524470267394, lng: 19.03881437387636 },
//       { lat: 49.284876176943975, lng: 19.039348133470323 },
//       { lat: 49.284755617474765, lng: 11.039026268388536 },
//     ],
//     information: {
//       title: 'Football field',
//     },
//   },
//   acceptCodeOutside: true,
//   code: 'testing',
//   showMap: true,
// }

// const TestingData: Step = {
//   stepIndex: 0,
//   title: 'TEsting',
//   description: 'TESTING',
//   code: codeData,
//   markup: {
//     visibleAlways: `
//     <div>
//     hA HA
//     <a href="#">assaino</a>
//     </div>`,
//     visibleWhenClose: `
//     <div>
//       Trash
//     </div>
//     `,
//   },
// }

// const vertex1: Vertex = {
//   lat: 59.285418,
//   lng: 18.03917,
// }

// const vertex2: Vertex = {
//   lat: 59.285446,
//   lng: 18.039138,
// }

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
  const [cleared, setCleared] = useState<boolean>(false)

  const isWithinRange = () => {
    if (currentStep?.radar) {
      return (
        locationStore.getDistance(currentStep.radar.node.pointOfOrigin) <=
        currentStep.radar.node.radius
      )
    } else if (currentStep?.code) {
      console.log(
        'isIn',
        locationStore.isInPolygon(currentStep.code.node.vertices)
      )
      return locationStore.isInPolygon(currentStep.code.node.vertices)
    }
    return false
  }

  useEffect(() => {
    if (id) {
      if (currentRoute?.uuid !== id) {
        routeStore.getRoute(
          id,
          () => {},
          () => {}
        )
      }
      if (!user) {
        userStore.getUser(props.uid)
      }
    }
    locationStore.watchPosition()
  }, [id])

  useEffect(() => {
    if (currentRoute && user) {
      const [isCleared, nextStepIndex] = userStore.getNextStep(
        id,
        currentRoute.steps.length
      )
      console.log('IS NEXT', isCleared, nextStepIndex)
      if (isCleared && !cleared) {
        setCleared(true)
        return
      }
      if (!isCleared) {
        const step = routeStore.getStep(nextStepIndex)
        setCurrentStep(step)
      }
    }
  }, [currentRoute, user])

  useEffect(() => {
    if (cleared) {
      userStore.clearRoute(id, () => {
        const { href, as } = Endpoints.ROUTE_COMPLETED(id)
        router.push(href, as)
      })
    }
  }, [cleared])

  useEffect(() => {
    return () => {
      locationStore.clearWatch()
    }
  }, [])

  return (
    <Layout padded>
      <RouteHeader />
      {routeIsLoading || !user ? (
        <LoadingSkeleton spesificRows={activeMapRouteSkeleton} />
      ) : (
        <div className="w-full flex flex-col flex-grow">
          <p className="flex-none text-xl">{currentStep?.title}</p>
          {currentStep?.description && (
            <p className="flex-none text-sm">{currentStep.description}</p>
          )}
          {currentStep?.radar && (
            <RadarStepComponent
              radar={currentStep.radar}
              step={currentStep}
              routeId={id}
            />
          )}
          {currentStep?.code && currentStep.code.showMap && (
            <div style={{ maxHeight: 450 }} className="flex flex-grow my-3">
              <Map visiblePolygonNodes={[currentStep.code.node]} />
            </div>
          )}
          {currentStep?.markup && (
            <div>
              {currentStep?.markup?.visibleAlways && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentStep.markup.visibleAlways,
                  }}
                />
              )}
              {currentStep?.markup?.visibleWhenClose && isWithinRange() && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentStep.markup.visibleWhenClose,
                  }}
                />
              )}
            </div>
          )}
          {currentStep?.code && (
            <CodeStepComponent
              step={currentStep}
              codeData={currentStep.code}
              routeId={id}
            />
          )}
        </div>
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
