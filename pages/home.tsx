import { NextPage, NextPageContext } from 'next'
import Input from '../components/Input'
import Layout from '../components/Layout'
import { Form, Formik } from 'formik'
import Button from '../components/Button'
import { useIntl } from 'react-intl'
import { rerouteOnUnauthorized } from '../helpers/validation'
import {
  useAuthStore,
  useLocationStore,
  useRouteStore,
  useUserStore,
} from '~/helpers/stores'
import { useRouter } from 'next/router'
import Endpoints from '~/helpers/endpoints'
import { useEffect, useState } from 'react'

const HomePage: NextPage<{}> = () => {
  const { formatMessage: f } = useIntl()
  const [error, setError] = useState<string>()
  const router = useRouter()

  const authStore = useAuthStore()
  const routeStore = useRouteStore()
  const userStore = useUserStore()
  const locationStore = useLocationStore()

  useEffect(() => {
    routeStore.wipeData()
    locationStore.clearWatch()
  }, [])

  return (
    <Layout padded>
      <div className="flex flex-col items-center">
        <Formik
          initialValues={{
            code: '',
          }}
          onSubmit={(values) => {
            setError(undefined)
            routeStore.getRoute(
              values.code,
              () => {
                const { href, as } = Endpoints.ROUTE_OVERVIEW(values.code)
                router.push(href, as)
              },
              () => {
                setError(f({ id: 'home.noroute' }))
              }
            )
          }}
        >
          {({ values }) => (
            <Form>
              <Input
                name="code"
                type="text"
                placeholder={f({ id: 'home.code' })}
                error={error}
                touched={true}
              />
              <Button
                disabled={values.code.length < 6}
                type="submit"
                className="mt-10"
              >
                {f({ id: 'home.findPath' })}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  authStore.signoutUser(() => {
                    routeStore.wipeData()
                    userStore.wipeData()
                    locationStore.wipeData()
                    router.push(Endpoints.LOGIN.href)
                  })
                }}
                className="mt-1"
              >
                {f({ id: 'home.logout' })}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const props = rerouteOnUnauthorized(ctx)
  return props
}

export default HomePage
