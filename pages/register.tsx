import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { rerouteOnAuthorized } from '~/helpers/validation'
import Button from '../components/Button'
import Input from '../components/Input'
import Layout from '../components/Layout'
import StyledLink from '../components/Link/StyledLink'
import Endpoints from '../helpers/endpoints'
import endpoints from '../helpers/endpoints'
import { registerSchema } from '../helpers/formikValidationSchemas'
import { capitalize } from '../helpers/functions'
import { useAuthStore, useUserStore } from '../helpers/stores'

const RegisterPage: NextPage<{}> = () => {
  const router = useRouter()

  const authStore = useAuthStore()
  const userStore = useUserStore()
  const { formatMessage: f } = useIntl()

  return (
    <Layout>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirm: '',
        }}
        validationSchema={registerSchema}
        onSubmit={({ email, password, firstName, lastName }) => {
          const details = { email, password, firstName, lastName }
          authStore.signUpUser(
            details,
            (user) => {
              userStore.setUser(user)
              router.push(Endpoints.HOME)
            },
            (error) => {
              //TODO:
            }
          )
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Input
              name="firstName"
              type="text"
              placeholder={capitalize(f({ id: 'login.firstName' }))}
              containerClassName="mb-2"
              error={errors.firstName}
              touched={touched.firstName}
            />
            <Input
              name="lastName"
              type="text"
              placeholder={capitalize(f({ id: 'login.lastName' }))}
              containerClassName="mb-2"
              error={errors.lastName}
              touched={touched.lastName}
            />
            <Input
              name="email"
              type="email"
              placeholder={capitalize(f({ id: 'login.email' }))}
              containerClassName="mb-2"
              error={errors.email}
              touched={touched.email}
            />
            <Input
              name="password"
              type="password"
              placeholder={capitalize(f({ id: 'login.password' }))}
              error={errors.password}
              containerClassName="mb-2"
              touched={touched.password}
            />
            <Input
              name="confirm"
              type="password"
              placeholder={capitalize(f({ id: 'login.confirm' }))}
              error={errors.confirm}
              touched={touched.confirm}
            />
            <Button type="submit" className="mt-20 mb-3">
              {f({ id: 'login.register' }).toUpperCase()}
            </Button>
            <Link {...endpoints.LOGIN}>
              <StyledLink>{f({ id: 'login.or.login' })}</StyledLink>
            </Link>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const props = rerouteOnAuthorized(ctx)
  return props
}

export default observer(RegisterPage)
