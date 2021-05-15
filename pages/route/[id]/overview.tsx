import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { useIntl } from 'react-intl'

import Button from '~/components/Button'
import Layout from '~/components/Layout'
import LoadingSkeleton from '~/components/LoadingSkeleton'
import RouteHeader from '~/components/RouteHeader'
import { Datapoint, Description, Title } from '~/components/typography'
import Endpoints from '~/helpers/endpoints'
import { detailRouteSkeleton } from '~/helpers/skeletons'
import { useRouteStore, useUserStore } from '~/helpers/stores'
import { rerouteOnUnauthorized } from '~/helpers/validation'

const Route: NextPage<{ id: string; uid: string }> = ({ id, uid }) => {
  const router = useRouter()
  const { formatMessage: f, formatDate: fd, formatTime: ft } = useIntl()
  const routeStore = useRouteStore()
  const userStore = useUserStore()
  const [routeState, setRouteState] =
    useState<'NOT STARTED' | 'STARTED' | 'ENDED'>('NOT STARTED')
  const { currentRoute, loading } = routeStore
  console.log('CURR', currentRoute)
  useEffect(() => {
    if (
      !routeStore.currentRoute ||
      routeStore?.currentRoute.uuid === id.toString()
    )
      routeStore.getRoute(
        id,
        () => {},
        () => {}
      )
  }, [routeStore])
  useEffect(() => {
    if (uid) {
      userStore.getUser(uid)
    }
  }, [uid])
  useEffect(() => {
    if (userStore.user && currentRoute) {
      const userRoute = userStore.findRoute(currentRoute)
      if (userRoute) {
        if (userRoute.finished) {
          setRouteState('ENDED')
          return
        }
        setRouteState('STARTED')
        return
      }
      setRouteState('NOT STARTED')
    }
  }, [userStore.user, currentRoute])
  const onClick = () => {
    const onComplete = () => {
      router.push(Endpoints.ROUTE_ACTIVE(id, currentRoute.title).href)
    }
    if (routeState === 'NOT STARTED') {
      userStore.addRoute(uid, currentRoute, onComplete)
    } else if (routeState === 'STARTED') {
      router.push(Endpoints.ROUTE_ACTIVE(id, currentRoute.title).href)
    } else {
      //TODO: RESET
      userStore.resetRoute(id, onComplete)
    }
  }
  return (
    <Layout padded>
      <RouteHeader returnHome />
      {currentRoute && !loading && (
        <div>
          <Title>{currentRoute.title}</Title>
          <Description>{currentRoute.description}</Description>
          <Datapoint
            title={f({ id: 'route.detail.routeId' })}
            value={`#${id}`}
          />
          <Datapoint
            title={f({ id: 'route.detail.steps' })}
            value={currentRoute?.steps?.length}
          />
          <Datapoint
            title={f({ id: 'route.detail.availableFrom' })}
            value={
              fd(currentRoute.availableFrom) + ft(currentRoute.availableFrom)
            }
          />
          <Datapoint
            title={f({ id: 'route.detail.type' })}
            value={currentRoute.type}
          />
        </div>
      )}
      {!currentRoute && loading && (
        <div>
          <LoadingSkeleton spesificRows={detailRouteSkeleton} />
        </div>
      )}
      <Button onClick={onClick} disabled={loading} className="my-4 uppercase">
        {!loading ? f({ id: getIntlLocation(routeState) }) : '...'}
      </Button>
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

const getIntlLocation = (state: 'NOT STARTED' | 'STARTED' | 'ENDED') => {
  return state === 'NOT STARTED'
    ? 'route.detail.buttonStates.unstarted'
    : state === 'STARTED'
    ? 'route.detail.buttonStates.started'
    : 'route.detail.buttonStates.ended'
}

export default observer(Route)
