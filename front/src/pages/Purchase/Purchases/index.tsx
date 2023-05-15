import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Box } from '@mui/material';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import axios from 'axios';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function PurchaseList() {

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_IP}:8080/user/json/login`,
    fetcher
  );
  const [purchasesData, setPurchasesData] = React.useState(null);


  React.useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_IP}:8080/purchase/json/listPurchase/${myData.userId}`)
      .then((response) =>{
        console.log(response.data);
        setPurchasesData(response.data);
      })
      .catch((error)=>{
        console.log(error);
      });
    },[]);

  return (
    <Box display={'flex'} sx={{ justifyContent: 'center', marginTop: '64px' }}>
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Box>
    {purchasesData?.map((Purchase: any, i: number) => (

      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={`http://${import.meta.env.VITE_IP}:8080/images/uploadFiles/${Purchase.purchaseProd.fileName}?w=248&fit=crop&auto=format`} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {Purchase.purchaseProd.prodName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                구매일: {Purchase.orderDate}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                상세보기
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            {Purchase.purchaseProd.price}원
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      
      
              ))}
</Box>
    </Paper>

    </Box>
  );
}