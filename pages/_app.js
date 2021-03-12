import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import i18n from '../i18n/i18n';
import flatten from 'flat';
import theme from '../config/theme';
import Firebase from '../config/firebase';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <IntlProvider locale={locale} messages={flatten(i18n[locale])}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />;
      </ThemeProvider>
    </IntlProvider>
  );
}

export default MyApp;
