import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { useIntl } from 'react-intl'

import Button from '~/components/Button'
import Layout from '~/components/Layout'
import LoadingSkeleton from '~/components/LoadingSkeleton'
import RouteHeader from '~/components/RouteHeader'
import { Datapoint, Description, Title } from '~/components/typography'
import Endpoints from '~/helpers/endpoints'
import { detailRouteSkeleton } from '~/helpers/skeletons'
import { useRouteStore } from '~/helpers/stores'
import { rerouteOnUnauthorized } from '~/helpers/validation'

const Route: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
  const { formatMessage: f, formatDate: fd, formatTime: ft } = useIntl()
  const routeStore = useRouteStore()
  const { currentRoute, loading } = routeStore
  useEffect(() => {
    routeStore.getRoute(id.toString())
  }, [routeStore])
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
      <Button
        onClick={() =>
          router.push(Endpoints.ROUTE_ACTIVE(id, currentRoute.title).href)
        }
        disabled={loading}
        className="my-4 uppercase"
      >
        {!loading ? f({ id: 'route.detail.buttonStates.unstarted' }) : '...'}
      </Button>
    </Layout>
  )
}

export default observer(Route)

export const getServerSideProps = async (ctx) => {
  const props = await rerouteOnUnauthorized(ctx)
  return {
    ...props,
    props: {
      ...props.props,
      id: ctx.query.id.toString(),
    },
  }
}
