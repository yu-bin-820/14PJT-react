import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Button,
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Navigate, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Product } from '@/typings/db';

const ProductDetail = (props: any) => {


  const { productNo } = useParams();
  const [product, setProduct] = useState<Product>();

  const navigate = useNavigate();
  const onClickPurchase = useCallback((event: MouseEvent) => {
    const { id } = event.target as HTMLImageElement;
    navigate(`/purchase/add/${id}`);
  }, []);


  useEffect(() => {
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
    <Grid
      container
      spacing={4}
      sx={{
        marginTop: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
      }}
    >
      <Grid xs={12} mdOffset={2} md={3}>
        <img               
          src={`http://${import.meta.env.VITE_IP}:8080/images/uploadFiles/${product?.fileName}?w=248&fit=crop&auto=format`}
          srcSet={`http://${import.meta.env.VITE_IP}:8080/images/uploadFiles/${product?.fileName}?w=248&fit=crop&auto=format&dpr=2 2x`}/>
      </Grid>
      <Grid xs={12} md={6}>
        <Stack width={'100%'}>
          <Typography variant="h6">{product?.prodName}</Typography>
          <Typography>{product?.prodDetail}</Typography>
          <Stack direction="row">
            <Typography>{product?.price}원</Typography>
          </Stack>
          <Stack direction="row">
            <Button id={product?.prodNo} onClick={onClickPurchase} >구매하기</Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

function Item(props: any) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </Paper>
  );
}

export default ProductDetail;
