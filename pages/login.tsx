import { NextPage } from 'next';
import Input from '../components/Input';
import Layout from '../components/Layout';
import { Form, Formik } from 'formik';
import Button from '../components/Button';
import { useIntl } from 'react-intl';
import { capitalize, capitalizeAll } from '../helpers/functions';

const LoginPage: NextPage<{}> = () => {
  const { formatMessage: f } = useIntl();
  return (
    <Layout>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={() => {}}
      >
        {() => (
          <Form>
            <Input name="email" type="email" placeholder={capitalize(f({ id: 'login.email' }))} className="mb-3" />
            <Input name="password" type="password" placeholder={capitalize(f({ id: 'login.password' }))} />
            <Button type="submit" className="mt-20">
              {f({ id: 'login.login' }).toUpperCase()}
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default LoginPage;
