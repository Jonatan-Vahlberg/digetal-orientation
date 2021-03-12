import { NextPage } from 'next';
import Input from '../components/Input';
import Layout from '../components/Layout';
import { Form, Formik } from 'formik';
import Button from '../components/Button';
import { useIntl } from 'react-intl';

const HomePage: NextPage<{}> = () => {
  const { formatMessage: f } = useIntl();
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
            <Input name="email" type="email" placeholder={f({ id: 'home.code' })} />
            <Button type="submit" className="mt-10">
              {f({ id: 'home.findPath' })}
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default HomePage;
