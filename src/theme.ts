'use client';
import { Montserrat } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Montserrat({ subsets: ["latin"] });

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
    },
    components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              width: '25ch',
              margin: '5px',
              '& input': {
                height: '5ch',
              },
            },
          },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(32, 69, 194)'
                    },
                },
            },
          },
        MuiInputLabel: {
            styleOverrides: {
              root: {
                '&.Mui-focused': {
                    color: 'rgb(32, 69, 194)'
                },
              },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'rgb(32, 69, 194)',
                    height: '5ch',
                    margin: '5px',
                    '&:hover': {
                        color: 'black',
                        borderColor: 'black',
                    },
                },
            },
        }
    },
});

export default theme;
