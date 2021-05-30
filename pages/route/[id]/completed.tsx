import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'
import Button from '~/components/Button'
import Layout from '~/components/Layout'
import RouteHeader from '~/components/RouteHeader'
import Endpoints from '~/helpers/endpoints'
import { rerouteOnUnauthorized } from '~/helpers/validation'

interface CompletedRoutePageProps {}

const CompletedRoutePage: NextPage<CompletedRoutePageProps> = () => {
  const { formatMessage: f } = useIntl()
  const { id: queryId } = useRouter().query
  let id = queryId.toString()
  return (
    <Layout padded>
      <RouteHeader title={f({ id: 'route.completed.title' })} />
      <p
        className="mb-5 text-xl"
        dangerouslySetInnerHTML={{
          __html: f({ id: 'route.completed.message' }),
        }}
      ></p>
      <Link {...Endpoints.ROUTE_OVERVIEW(id)}>
        <Button>{f({ id: 'route.completed.go_back' })}</Button>
      </Link>
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

export default CompletedRoutePage
