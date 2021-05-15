import { NextPage } from 'next'
import Input from '../components/Input'
import Layout from '../components/Layout'
import { Form, Formik } from 'formik'
import Button from '../components/Button'
import { useIntl } from 'react-intl'
import { capitalize, capitalizeAll } from '../helpers/functions'
import { observer, Observer } from 'mobx-react-lite'
import { useAuthStore, useLocationStore, useUserStore } from '../helpers/stores'
import { useEffect } from 'react'
import Link from 'next/link'
import endpoints from '../helpers/endpoints'
import StyledLink from '../components/Link/StyledLink'
import { loginSchema } from '../helpers/formikValidationSchemas'
import Firebase from '../config/firebase'
import { rerouteOnAuthorized } from '../helpers/validation'
import { useRouter } from 'next/router'
import Endpoints from '../helpers/endpoints'

const LoginPage: NextPage<{}> = () => {
  const { formatMessage: f } = useIntl()
  const router = useRouter()
  const userStore = useUserStore()
  const locationStore = useLocationStore()
  const authStore = useAuthStore()

  // useEffect(() => {
  //   if (navigator) {
  //     if ('geolocation' in navigator) {
  //       navigator.geolocation.watchPosition((position) => {
  //         const { latitude, longitude } = position.coords
  //         locationStore.setCoordinates([latitude, longitude])
  //       })
  //     }
  //   }
  // }, [])

  useEffect(() => {
    // console.log('COORDS', locationStore.coordinates)
  }, [locationStore.coordinates])
  return (
    <Layout padded>
      <div className="flex flex-col items-center">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            authStore.signInUser(values, (user) => {
              userStore.setUser(user)
              router.push(Endpoints.HOME)
            })
          }}
        >
          {({ touched, errors }) => (
            <Form>
              <Input
                name="email"
                type="email"
                placeholder={capitalize(f({ id: 'login.email' }))}
                containerClassName="mb-3"
                error={errors.email}
                touched={touched.email}
              />
              <Input
                name="password"
                type="password"
                error={errors.email}
                touched={touched.email}
                placeholder={capitalize(f({ id: 'login.password' }))}
              />
              <Button type="submit" className="mt-20 mb-3">
                {f({ id: 'login.login' }).toUpperCase()}
              </Button>
              <Link {...endpoints.REGISTER}>
                <StyledLink>{f({ id: 'login.or.register' })}</StyledLink>
              </Link>
              {/* <p className="text-white">YOU ARE INSIDE {locationStore.isInPolygon() ? 'TRUE' : 'FALSE'}</p>
            <p className="text-white">{locationStore.coordinates.join(' ')}</p> */}
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const props = rerouteOnAuthorized(ctx)
  return props
}

export default observer(LoginPage)
