import { NextPage, NextPageContext } from 'next'
import React from 'react'
import Layout from '~/components/Layout'
import RouteHeader from '~/components/RouteHeader'
import { rerouteOnUnauthorized } from '~/helpers/validation'

interface CompletedRoutePageProps {}

const CompletedRoutePage: NextPage<CompletedRoutePageProps> = () => {
  return (
    <Layout padded>
      <RouteHeader title="WELL DONE" />
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
