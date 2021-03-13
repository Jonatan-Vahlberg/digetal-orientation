import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import i18n from '../i18n/i18n';
import flatten from 'flat';
import theme from '../config/theme';
import Firebase from '../config/firebase';
import { useRouter } from 'next/router';
import { StoreProvider, UserStore, AuthStore, LocationStore, RouteStore } from '../helpers/stores';

const userStore = new UserStore();
const authStore = new AuthStore();
const locationStore = new LocationStore();
const routeStore = new RouteStore();

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <StoreProvider stores={{ userStore, authStore, locationStore, routeStore }}>
      <IntlProvider locale={locale} messages={flatten(i18n[locale])}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />;
        </ThemeProvider>
      </IntlProvider>
    </StoreProvider>
  );
}

export default MyApp;
