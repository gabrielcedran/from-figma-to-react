
import {themes} from '@storybook/theming'

// we need to import tailwind's default configuration into storybook's preview environment, otherwise 
// all the stylization made via tailwind won't take effect.
import '../src/styles/global.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark
  }
}