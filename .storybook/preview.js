import "./index.less"

export const parameters = {
  actions: { argTypesRegex: "^(on|after)[A-Z].*"  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
