import { RedocOptions } from 'nestjs-redoc';
import { darken, desaturate, lighten, readableColor, transparentize } from 'polished';

const theme = {
  primary: '#000000',
  error: '#cf4a3b',
  warn: '#F5A151',
  success: '#6bbd5b',
  info: '#248fb2',
  white: '#ffffff',
  light: '#FAFAFA',
  gray_green: '#263238',
  // methods
  get: '#6bbd5b',
  post: '#248fb2',
  put: '#F5A151',
  options: '#d3ca12',
  patch: '#9b708b',
  delete: '#e27a7a',
  basic: '#999',
  link: '#31bbb6',
  head: '#00ff15',
  // font
  fontSize: '14px',
  fontFamily: 'Roboto, sans-serif',
};

export const redocOptions: RedocOptions = {
  title: 'Books 📕',
  logo: {
    url: 'https://res.cloudinary.com/de6swhz89/image/upload/v1647977625/home/logopng_t3lb1g.png',
    altText: 'logo',
  },
  sortPropsAlphabetically: true,
  hideHostname: false,
  hideDownloadButton: true,
  disableSearch: true,
  theme: {
    spacing: {
      unit: 5,
      sectionHorizontal: ({ spacing }) => spacing.unit * 8,
      sectionVertical: ({ spacing }) => spacing.unit * 8,
    },
    colors: {
      tonalOffset: 0.2,
      primary: {
        main: theme.primary,
        light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
        dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
        contrastText: ({ colors }) => readableColor(colors.primary.main),
      },
      success: {
        main: theme.success,
        light: ({ colors }) => lighten(colors.tonalOffset, colors.success.main),
        dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
        contrastText: ({ colors }) => readableColor(colors.success.main),
      },
      error: {
        main: theme.error,
        light: ({ colors }) => lighten(colors.tonalOffset, colors.error.main),
        dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
        contrastText: ({ colors }) => readableColor(colors.error.main),
      },
      warning: {
        main: theme.warn,
        light: ({ colors }) => lighten(colors.tonalOffset, colors.warning.main),
        dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
        contrastText: theme.white,
      },
      text: {
        primary: '#676767',
        secondary: '#222428',
      },
      responses: {
        success: {
          color: ({ colors }) => colors.success.main,
          backgroundColor: ({ colors }) => transparentize(0.9, colors.success.main),
        },
        error: {
          color: ({ colors }) => colors.error.main,
          backgroundColor: ({ colors }) => transparentize(0.9, colors.error.main),
        },
        redirect: {
          color: theme.warn,
          backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
        },
        info: {
          color: theme.info,
          backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
        },
      },
      http: {
        get: theme.get,
        post: theme.post,
        put: theme.put,
        options: theme.options,
        patch: theme.patch,
        delete: theme.delete,
        basic: theme.basic,
        link: theme.link,
        head: theme.head,
      },
      navbar: {
        main: ({ colors }) => colors.primary.main,
        contrastText: ({ colors }) => colors.primary.contrastText,
      },
      footer: {
        main: ({ colors }) => colors.primary.main,
        contrastText: ({ colors }) => colors.primary.contrastText,
      },
    },
    sidebar: {
      width: '260px',
      backgroundColor: theme.light,
      textColor: '#333333',
      fontFamily: theme.fontFamily,
      activeTextColor: (theme) => theme.sidebar.textColor || theme.colors.primary.main,
      groupItems: {
        textTransform: 'uppercase',
      },
      level1Items: {
        textTransform: 'none',
      },
      arrow: {
        size: '1.5em',
        color: (theme) => theme.sidebar.textColor,
      },
    },
    typography: {
      fontSize: theme.fontSize,
      lineHeight: '1.5em',
      fontWeightRegular: '400',
      fontWeightBold: '600',
      fontWeightLight: '600',
      fontFamily: theme.fontFamily,
      headings: {
        fontFamily: ({ typography }) => typography.headings.fontFamily,
        fontWeight: '600',
      },
      heading1: {
        fontSize: '1.85714em',
        fontWeight: '600',
        fontFamily: ({ typography }) => typography.headings.fontFamily,
        lineHeight: ({ typography }) => typography.lineHeight,
        color: ({ colors }) => colors.primary.main,
        capitalize: true,
      },
      heading2: {
        fontSize: '1.57143em',
        fontWeight: '600',
        color: ({ colors }) => colors.text.primary,
        fontFamily: ({ typography }) => typography.headings.fontFamily,
        lineHeight: ({ typography }) => typography.lineHeight,
        capitalize: false,
      },
      heading3: {
        fontSize: '1.27em',
        fontWeight: '600',
        color: ({ colors }) => colors.text.primary,
        fontFamily: ({ typography }) => typography.headings.fontFamily,
        lineHeight: ({ typography }) => typography.lineHeight,
        capitalize: false,
      },
      code: {
        fontSize: theme.fontSize,
        fontFamily: 'Courier, monospace',
        fontWeight: ({ typography }) => typography.fontWeightRegular,
        backgroundColor: theme.gray_green,
        wrap: false,
      },
      links: {
        color: ({ colors }) => colors.primary.main,
        visited: ({ typography }) => typography.links.color,
        hover: ({ typography }) => lighten(0.2, typography.links.color),
      },
    },
    rightPanel: {
      backgroundColor: theme.gray_green,
      width: '40%',
      textColor: theme.white,
    },
    schema: {
      linesColor: ({ theme }) =>
        lighten(theme.colors.tonalOffset, desaturate(theme.colors.tonalOffset, theme.colors.primary.main)),
      defaultDetailsWidth: '80%',
      typeNameColor: (theme) => theme.colors.text.secondary,
      typeTitleColor: (theme) => theme.schema.typeNameColor,
      requireLabelColor: (theme) => theme.colors.error.main,
      labelsTextSize: '0.9em',
    },
  },
};
