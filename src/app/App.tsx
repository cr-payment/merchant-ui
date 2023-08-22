/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';

import { useTranslation } from 'react-i18next';
import Bill from './components/Bill';
import {
  Box,
  Button,
  Grid,
  ThemeProvider,
  createTheme,
  makeStyles,
  styled,
} from '@mui/material';
import { GlobalStyle } from 'styles/global-styles';
import { polygonMumbai } from 'wagmi/chains';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { CrPayment } from '../sdk';
import { useEffect, useState } from 'react';

const apiKey = process.env.REACT_APP_ALCHEMY_APIKEY!;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: apiKey })],
);
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Segoe UI',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

// const MyButton = (props) => (
//   <Button sx={{ backgroundColor: props.myCustomColor }}>{props.text}</Button>
// );

export function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Function to get the value of a query parameter from the URL
    function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    // Read the 'param' query parameter from the URL
    const sessId = getQueryParam('session_id');

    if (sessId) {
      // Set the value in the 'param' key in localStorage
      localStorage.setItem('session_id ', sessId);
      // dispatch action get sessionId
      console.log(`Stored value '${sessId}' in localStorage.`);
    } else {
      console.log("No 'session_id' query parameter found in the URL.");
    }
  }, []);

  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
  };

  return (
    <WagmiConfig config={config}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Box
          sx={{
            height: 100,
          }}
        />

        {!showComponent && (
          <>
            <Box
              sx={{
                height: 100,
              }}
            />
            <Grid container spacing={8}>
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                <Button
                  onClick={handleButtonClick}
                  sx={{
                    height: 100,
                    width: 300,
                    backgroundColor: '#FAC898',
                    color: '#000000',
                  }}
                >
                  Continue to CrPayment
                </Button>
              </Grid>
            </Grid>
          </>
        )}

        {showComponent && (
          <Grid container spacing={8}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Bill />
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        )}
      </ThemeProvider>
    </WagmiConfig>
  );
}
