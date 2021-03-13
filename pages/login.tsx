import { NextPage } from 'next';
import Input from '../components/Input';
import Layout from '../components/Layout';
import { Form, Formik } from 'formik';
import Button from '../components/Button';
import { useIntl } from 'react-intl';
import { capitalize, capitalizeAll } from '../helpers/functions';
import { observer, Observer } from 'mobx-react-lite';
import { useLocationStore, useUserStore } from '../helpers/stores';
import { useEffect } from 'react';

const LoginPage: NextPage<{}> = () => {
  const { formatMessage: f } = useIntl();
  const userStore = useUserStore();
  const locationStore = useLocationStore();
  useEffect(() => {
    if (navigator) {
      if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition((position) => {
          const { latitude, longitude } = position.coords;
          locationStore.setCoordinates([latitude, longitude]);
        });
      }
    }
  }, []);

  useEffect(() => {
    console.log('COORDS', locationStore.coordinates);
  }, [locationStore.coordinates]);
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

            <p className="text-white">YOU ARE INSIDE {locationStore.isInPolygon() ? 'TRUE' : 'FALSE'}</p>
            <p className="text-white">{locationStore.coordinates.join(' ')}</p>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default observer(LoginPage);
