import React, { DOMAttributes, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Button, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const matches = useMediaQuery('(min-width:600px)');
  const cols = matches ? 4 : 2;
  const [productsData, setProductsData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_IP}:8080/product/json/listProduct`)
      .then((response) =>{
        console.log(response.data);
        setProductsData(response.data);
      })
      .catch((error)=>{
        console.log(error);
      });
    },[]);


  const onClickProduct = useCallback((event: MouseEvent) => {
    const { id } = event.target as HTMLImageElement;
    navigate(`/product/detail/productno/${id}`);
  }, []);

  console.log(productsData);
  
  return (
    <Box display={'flex'} sx={{ justifyContent: 'center', marginTop: '64px' }}>
      <ImageList cols={cols} gap={20} sx={{ width: '90%', height: '100%' }}>
        {productsData?.map((product: any, i: number) => (
          <ImageListItem key={i}>
            <img
              src={`http://${import.meta.env.VITE_IP}:8080/images/uploadFiles/${product.fileName}?w=248&fit=crop&auto=format`}
              srcSet={`http://${import.meta.env.VITE_IP}:8080/images/uploadFiles/${product.fileName}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={product.prodName}
              loading="lazy"
              onClick={onClickProduct}
              id={product.prodNo}
            />

            <ImageListItemBar
              title={product.prodName}
              subtitle={<span>{product.price} ₩</span>}
              position="below"
            />
            <br />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
