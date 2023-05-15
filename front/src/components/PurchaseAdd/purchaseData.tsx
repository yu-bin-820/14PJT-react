import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    styled,
  } from '@mui/material';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate, useParams } from 'react-router';
import { Product } from '@/typings/db';
import axios from 'axios';
  
  
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  export const PurchaseData = () => {

    const { productNo } = useParams();
    const [product, setProduct] = React.useState<Product>();
  
    const navigate = useNavigate();
    const onClickPurchase = React.useCallback((event: MouseEvent) => {
      const { id } = event.target as HTMLImageElement;
      navigate(`/purchase/add/${id}`);
    }, []);
  
  
    React.useEffect(() => {
      axios
        .get(`http://${import.meta.env.VITE_IP}:8080/product/json/getProduct/${productNo}`)
        .then((response) => {
          console.log(response.data);
          setProduct(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return (


    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >

<Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={`http://${import.meta.env.VITE_IP}:8080/images/uploadFiles/${product?.fileName}?w=248&fit=crop&auto=format`} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h5" gutterBottom  component="div">
              {product?.prodName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
              {product?.price}원
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
        };