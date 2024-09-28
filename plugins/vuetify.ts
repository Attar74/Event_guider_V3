import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { ar, en } from 'vuetify/locale';
import { createVuetify } from 'vuetify';

const workey = {
  dark: false,
  colors: {
    primary: '#617725',
    secondary: '#1388FF',
  },
};

export default defineNuxtPlugin(({ vueApp }) => {
  const locale = vueApp.config.globalProperties.$i18n.locale;

  const vuetify = createVuetify({
    ssr: true,
    locale: {
      locale: String(locale),
      fallback: 'en',
      messages: { ar, en },
    },
    defaults: {
      global: {
        elevation: 0,
      },
      VBtn: {
        style: 'letter-spacing: 0; text-transform: capitalize',
        rounded: 'lg',
        height: '44px',
      },
      VTextField: {
        density: 'compact',
        hideDetails: 'auto',
        color: workey.colors.primary,
        variant: 'outlined',
        rounded: 'lg',
      },
      VTextarea: {
        density: 'compact',
        hideDetails: 'auto',
        color: workey.colors.primary,
        variant: 'outlined',
        rounded: 'lg',
      },
      VSelect: {
        density: 'compact',
        hideDetails: 'auto',
        color: workey.colors.primary,
        variant: 'outlined',
        rounded: 'lg',
      },
      VAutocomplete: {
        density: 'compact',
        hideDetails: 'auto',
        color: workey.colors.primary,
        variant: 'outlined',
        rounded: 'lg',
      },
      VFileInput: {
        density: 'compact',
        hideDetails: 'auto',
        color: workey.colors.primary,
        variant: 'outlined',
        rounded: 'lg',
      },
      VCheckbox: {
        hideDetails: 'auto',
      },
      VRadioGroup: {
        color: 'primary',
      },
      VToggle: {
        hideDetails: 'auto',
      },
    },
    theme: {
      defaultTheme: 'workey',
      themes: {
        workey,
      },
    },
    components,
    directives,
  });

  vueApp.use(vuetify);
});
