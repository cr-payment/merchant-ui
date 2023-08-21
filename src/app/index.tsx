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
export function App() {
  const { i18n } = useTranslation();

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
