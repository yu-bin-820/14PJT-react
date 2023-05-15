
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import MapIcon from '@mui/icons-material/Map';

const paymentOption = [
  {
    value: '1',
    label: '현금구매'
  },
  {
    value: '2',
    label: '카드구매'
  }
];

const PurchaseInput = () => {

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_IP}:8080/user/json/login`,
    fetcher
  );

  const { productNo } = useParams();

  const [values, setValues] = useState({
    prodNo: productNo,
    userId: myData.userId,
    paymentOption: '',
    receiverName: myData.userName,
    receiverPhone: myData.phone,
    dlvy_request: '',
    roadAddr: myData.addr,
    detailAddr: '',
    lat: '',
    lng: ''
  });

  const handleChange = useCallback(
    (event :ChangeEvent<HTMLTextAreaElement>) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
        
      }));
    },
    []
  );

  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      
      try {
        // 서버로 보낼 데이터 객체 생성
        const data = {
          prodNo: values.prodNo,
          userId: values.userId,
          receiverName: values.receiverName,
          paymentOption: values.paymentOption,
          receiverPhone: values.receiverPhone,
          roadAddr: values.roadAddr
        };
        
        // axios를 사용하여 POST 요청 보내기
        const response = await axios.post(`http://${import.meta.env.VITE_IP}:8080/purchase/json/addPurchase`, data);
        
        // 응답 처리
        console.log(response.data); // 서버 응답 데이터 출력
        
        //페이지 리다이렉트 
        navigate('/purchase/list');
        
      } catch (error) {
        // 오류 처리
        console.error(error);
      }
    },
    [values]
  );


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card
            sx={{
                flexGrow: 1,
                py: 5
              }}>

        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="이름을 입력해 주세요"
                  label="이름"
                  name="receiverName"
                  onChange={handleChange}
                  required
                  value={values.receiverName}
                />
              </Grid>
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  label="핸드폰번호"
                  name="receiverPhone"
                  onChange={handleChange}
                  required
                  value={values.receiverPhone}
                />
              </Grid>
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  label="주소"
                  name="roadAddr"
                  onChange={handleChange}
                  required
                  value={values.roadAddr}
                />              
                <Button sx={{ my: 2, color: 'black' }}>
                 <MapIcon fontSize="large" />
              </Button>
              </Grid>
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  label="상세주소"
                  name="detailAddr"
                  onChange={handleChange}
                  required
                  value={values.detailAddr}
                />
              </Grid>
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  label="요청사항"
                  name="dlvy_request"
                  onChange={handleChange}
                  required
                  value={values.dlvy_request}                />
              </Grid>
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="paymentOption"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.paymentOption}
                >
                  {paymentOption.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            구매
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default PurchaseInput