import * as React from 'react';
import Button from '@mui/material/Button';
import { useBillSlice } from '../billSlice';
import { selectBill, selectBillData } from '../billSlice/selectors';
import { useSelector } from 'react-redux';

import { Typography, Box, Grid } from '@mui/material';
import Pay from './Pay';

// TODO: thêm font cho Typography (theo theme?)
export const InfoLine = ({ label, value }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">{label}</Typography>
      <Box flexGrow={1} mx={2}></Box>
      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Box>
  );
};
const Cart = ({ billInfo }) => {
  return (
    <div>
      {billInfo?.cart.map((bill: { name: string; price: number }, index) => (
        <InfoLine key={index} label={bill.name} value={bill.price} />
      ))}
      <Box flexGrow={15} borderBottom="1px solid #ccc" my={4}></Box>

      <InfoLine label="Shipping" value={billInfo?.shipping} />
      <InfoLine label="Total" value={billInfo?.total} />
    </div>
  );
};

export default function Bill() {
  const [open, setOpen] = React.useState(false);

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  //   load billInfo? from state
  const { actions } = useBillSlice();
  const billInfo = useSelector(selectBillData);

  return (
    <div>
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <Typography variant="h5">Pay to {billInfo?.shopName}</Typography>
          <Typography variant="h3">${billInfo?.total}</Typography>
          <Typography variant="h6">Cart</Typography>
          <Cart billInfo={billInfo} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">Billing Information</Typography>
          <InfoLine label="Name" value={billInfo?.name} />
          <InfoLine label="Email" value={billInfo?.email} />
          <InfoLine label="Number" value={billInfo?.number} />
          <Box flexGrow={15} borderBottom="1px solid #ccc" my={4}></Box>
          <Pay billInfo={billInfo} />
        </Grid>
      </Grid>
    </div>
  );
}
