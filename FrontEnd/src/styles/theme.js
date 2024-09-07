import { createTheme } from '@mui/material/styles';
import {
  COLOR,
  TRANSPARENT_COLOR,
  GRADIENT_COLOR,
  CONTAINED_BUTTON_COLOR,
  OUTLINED_BUTTON_COLOR,
  TEXT_BUTTON_COLOR,
  GRADIENT_BUTTON_COLOR,
} from './color';
import { BREAKPOINTS } from './config';

const defaultTheme = createTheme({});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: BREAKPOINTS.XS,
      mxs: BREAKPOINTS.MXS,
      sm: BREAKPOINTS.SM,
      smd: BREAKPOINTS.SMD,
      md: BREAKPOINTS.MD,
      lg: BREAKPOINTS.LG,
      mlg: BREAKPOINTS.MLG,
      cmlg: BREAKPOINTS.CMLG,
      xl: BREAKPOINTS.XL,
    },
  },
  palette: {
    primary: {
      main: COLOR.primary,
    },
    secondary: {
      main: COLOR.secondary.old,
    },
    iconPrimary: {
      main: COLOR.darkBlue,
    },
    iconSecondary: {
      main: COLOR.indigo[64],
    },
    white: {
      main: COLOR.white,
    },
    buttonPrimary: {
      main: COLOR.indigo[100],
    },
    error: {
      main: COLOR.error,
    },
    warning: {
      main: COLOR.warning,
    },
    info: {
      main: COLOR.info,
    },
    success: {
      main: COLOR.success,
    },
    text: {
      primary: COLOR.text,
    },
    gray: {
      main: COLOR.lightText,
    },
    light: {
      main: COLOR.light,
    },
    divider: COLOR.divider,
    background: {
      default: COLOR.background,
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: '"SF Pro", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          padding: '10px 22px',
          color: COLOR.darkBlue,
        },
        containedPrimary: {
          color: COLOR.darkBlue,
          '&:hover': {
            backgroundColor: CONTAINED_BUTTON_COLOR.primary.hover,
          },
          '&:active': {
            backgroundColor: CONTAINED_BUTTON_COLOR.primary.active,
          },
          '&:focus': {
            backgroundColor: CONTAINED_BUTTON_COLOR.primary.focus,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: CONTAINED_BUTTON_COLOR.secondary.hover,
          },
          '&:active': {
            backgroundColor: CONTAINED_BUTTON_COLOR.secondary.active,
          },
          '&:focus': {
            backgroundColor: CONTAINED_BUTTON_COLOR.secondary.focus,
          },
        },
        outlinedPrimary: {
          color: COLOR.darkBlue,
          border: `1px solid ${COLOR.darkBlue}`,
          '&:hover': {
            backgroundColor: OUTLINED_BUTTON_COLOR.primary.hover,
            border: `1px solid ${COLOR.darkBlue}`,
          },
          '&:active': {
            backgroundColor: OUTLINED_BUTTON_COLOR.primary.active,
          },
          '&:focus': {
            backgroundColor: OUTLINED_BUTTON_COLOR.primary.focus,
          },
        },
        outlinedSecondary: {
          '&:hover': {
            backgroundColor: OUTLINED_BUTTON_COLOR.secondary.hover,
          },
          '&:active': {
            backgroundColor: OUTLINED_BUTTON_COLOR.secondary.active,
          },
          '&:focus': {
            backgroundColor: OUTLINED_BUTTON_COLOR.secondary.focus,
          },
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: TEXT_BUTTON_COLOR.primary.hover,
          },
          '&:active': {
            backgroundColor: TEXT_BUTTON_COLOR.primary.active,
          },
          '&:focus': {
            backgroundColor: TEXT_BUTTON_COLOR.primary.focus,
          },
        },
        textSecondary: {
          '&:hover': {
            backgroundColor: TEXT_BUTTON_COLOR.secondary.hover,
          },
          '&:active': {
            backgroundColor: TEXT_BUTTON_COLOR.secondary.active,
          },
          '&:focus': {
            backgroundColor: TEXT_BUTTON_COLOR.secondary.focus,
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'success' },
          style: {
            '&:hover': {
              background: CONTAINED_BUTTON_COLOR.success.hover,
            },
            '&:active': {
              background: CONTAINED_BUTTON_COLOR.success.active,
            },
            '&:focus': {
              background: CONTAINED_BUTTON_COLOR.success.focus,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'error' },
          style: {
            color: COLOR.white,
            '&:hover': {
              background: CONTAINED_BUTTON_COLOR.error.hover,
            },
            '&:active': {
              background: CONTAINED_BUTTON_COLOR.error.active,
            },
            '&:focus': {
              background: CONTAINED_BUTTON_COLOR.error.focus,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'warning' },
          style: {
            '&:hover': {
              background: CONTAINED_BUTTON_COLOR.warning.hover,
            },
            '&:active': {
              background: CONTAINED_BUTTON_COLOR.warning.active,
            },
            '&:focus': {
              background: CONTAINED_BUTTON_COLOR.warning.focus,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'info' },
          style: {
            '&:hover': {
              background: CONTAINED_BUTTON_COLOR.info.hover,
            },
            '&:active': {
              background: CONTAINED_BUTTON_COLOR.info.active,
            },
            '&:focus': {
              background: CONTAINED_BUTTON_COLOR.info.focus,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'success' },
          style: {
            '&:hover': {
              background: OUTLINED_BUTTON_COLOR.success.hover,
            },
            '&:active': {
              background: OUTLINED_BUTTON_COLOR.success.active,
            },
            '&:focus': {
              background: OUTLINED_BUTTON_COLOR.success.focus,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: {
            '&:hover': {
              background: OUTLINED_BUTTON_COLOR.error.hover,
            },
            '&:active': {
              background: OUTLINED_BUTTON_COLOR.error.active,
            },
            '&:focus': {
              background: OUTLINED_BUTTON_COLOR.error.focus,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'warning' },
          style: {
            '&:hover': {
              background: OUTLINED_BUTTON_COLOR.warning.hover,
            },
            '&:active': {
              background: OUTLINED_BUTTON_COLOR.warning.active,
            },
            '&:focus': {
              background: OUTLINED_BUTTON_COLOR.warning.focus,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'info' },
          style: {
            '&:hover': {
              background: OUTLINED_BUTTON_COLOR.info.hover,
            },
            '&:active': {
              background: OUTLINED_BUTTON_COLOR.info.active,
            },
            '&:focus': {
              background: OUTLINED_BUTTON_COLOR.info.focus,
            },
          },
        },
        {
          props: { variant: 'text', color: 'success' },
          style: {
            '&:hover': {
              background: TEXT_BUTTON_COLOR.success.hover,
            },
            '&:active': {
              background: TEXT_BUTTON_COLOR.success.active,
            },
            '&:focus': {
              background: TEXT_BUTTON_COLOR.success.focus,
            },
          },
        },
        {
          props: { variant: 'text', color: 'error' },
          style: {
            '&:hover': {
              background: TEXT_BUTTON_COLOR.error.hover,
            },
            '&:active': {
              background: TEXT_BUTTON_COLOR.error.active,
            },
            '&:focus': {
              background: TEXT_BUTTON_COLOR.error.focus,
            },
          },
        },
        {
          props: { variant: 'text', color: 'warning' },
          style: {
            '&:hover': {
              background: TEXT_BUTTON_COLOR.warning.hover,
            },
            '&:active': {
              background: TEXT_BUTTON_COLOR.warning.active,
            },
            '&:focus': {
              background: TEXT_BUTTON_COLOR.warning.focus,
            },
          },
        },
        {
          props: { variant: 'text', color: 'info' },
          style: {
            '&:hover': {
              background: TEXT_BUTTON_COLOR.info.hover,
            },
            '&:active': {
              background: TEXT_BUTTON_COLOR.info.active,
            },
            '&:focus': {
              background: TEXT_BUTTON_COLOR.info.focus,
            },
          },
        },
        {
          props: { variant: 'gradient' },
          style: {
            '&:hover': {
              boxShadow: defaultTheme.shadows[4],
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'primary' },
          style: {
            color: COLOR.white,
            background: GRADIENT_COLOR.primary,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.primary.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.primary.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.primary.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'secondary' },
          style: {
            color: COLOR.white,
            background: GRADIENT_COLOR.secondary,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.secondary.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.secondary.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.secondary.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'success' },
          style: {
            background: GRADIENT_COLOR.success,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.success.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.success.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.success.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'error' },
          style: {
            color: COLOR.white,
            background: GRADIENT_COLOR.error,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.error.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.error.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.error.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'warning' },
          style: {
            background: GRADIENT_COLOR.warning,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.warning.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.warning.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.warning.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'info' },
          style: {
            background: GRADIENT_COLOR.info,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.info.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.info.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.info.focus,
            },
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: COLOR.light,
          },
          '& label.Mui-focused': {
            color: COLOR.dark,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: COLOR.light,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: COLOR.light,
            },
            '&:hover fieldset': {
              borderColor: COLOR.light,
              borderWidth: '1px',
            },
            '&.Mui-focused fieldset': {
              borderColor: COLOR.light,
              borderWidth: '1px',
            },
          },
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiMenuItem-root': {
            '&:focus': {
              color: COLOR.darkBlue,
              fontWeight: 600,
              backgroundColor: COLOR.primary40,

              '&:hover': {
                color: COLOR.darkBlue,
                fontWeight: 600,
                backgroundColor: COLOR.primary40,
              },
            },

            '&:hover': {
              backgroundColor: TRANSPARENT_COLOR.dark,
            },
          },
        },
      },
    },
  },
});

export default theme;
