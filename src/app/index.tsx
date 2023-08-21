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
import { alchemyProvider } from 'wagmi/providers/alchemy'
import {CrPayment} from "crpayment-sdk";

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

const crPayment = new CrPayment({
  api_keys: {
      public_api_key: 'string',
      private_api_key: 'string'
  },
  network: 'testnet'
});
const createSession = async () => {
  // Step 2: create session payment by calling this function
  const session = await crPayment.session.create({
      itemId: '1',
      amount: '1'
  });

  console.log("session", session);
  return session;
}

export function App() {
  const { i18n } = useTranslation();
  // console.log(crPayment.session)
  createSession();

  return (
    <WagmiConfig config={config}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Box
          sx={{
            height: 100,
          }}
        />
        <Grid container spacing={8}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Bill />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </ThemeProvider>
    </WagmiConfig>
  );
}
