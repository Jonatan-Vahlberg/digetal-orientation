import { NextPage, NextPageContext } from 'next'
import Input from '../components/Input'
import Layout from '../components/Layout'
import { Form, Formik } from 'formik'
import Button from '../components/Button'
import { useIntl } from 'react-intl'
import nookies from 'nookies'
import { verifyIdToken } from '../config/admin'
import { rerouteOnUnauthorized } from '../helpers/validation'
import firebase from 'firebase/app'

const HomePage: NextPage<{}> = () => {
  const { formatMessage: f } = useIntl()
  return (
    <Layout>
      <Formik
        initialValues={{
          code: '',
        }}
        onSubmit={() => {}}
      >
        {() => (
          <Form>
            <Input
              name="email"
              type="email"
              placeholder={f({ id: 'home.code' })}
            />
            <Button type="submit" className="mt-10">
              {f({ id: 'home.findPath' })}
            </Button>
            <Button
              type="button"
              onClick={() => {
                firebase.auth().signOut()
              }}
              className="mt-1"
            >
              LogOut
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const props = rerouteOnUnauthorized(ctx)
  return props
}

export default HomePage
