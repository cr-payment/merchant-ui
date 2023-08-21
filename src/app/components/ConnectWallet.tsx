import { Box, Typography } from '@mui/material';
import { useAccount, useConnect, useContractWrite, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import contractABI from './contractABI.json';

function Profile() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (isConnected) return <div>Connected to {ensName ?? address}</div>;
  return <button onClick={() => connect()}>Connect Wallet</button>;
}

const ConnectWallet = () => {

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: '0x50209FE5c038724CF37B12CF6f51Da68a1fD5221',
    abi: contractABI as any[],
    functionName: 'pay',
    args: [
      331692469592739300,
      '0x6aFA060280D8ee3ca242A65993d3deCF0Bdef27b',
      '0xA19e972b3a4d706236e7F25709291Ba79EBD460C',
      1,
    ],
  });

  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
      <Typography variant="h4">Connect your wallet</Typography>
      <Profile />
      <div>
        <button onClick={() => write()}>Feed</button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    </Box>
  );
};
export default ConnectWallet;
