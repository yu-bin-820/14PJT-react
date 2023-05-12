
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
import { IUser } from '@/typings/db';
import axios from 'axios';



const states = [
  {
    value: '1',
    label: '현금구매'
  },
  {
    value: '2',
    label: '카드구매'
  }
];

const PurchaseData = () => {
  const [values, setValues] = useState({
    firstName: 'Anika',
    lastName: 'Visser',
    email: 'demo@devias.io',
    phone: '1234',
    state: 'los-angeles',
    country: 'USA'
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

  const handleSubmit = useCallback(
    (event:FormEvent) => {
      event.preventDefault();
    },
    []
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
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="이름을 입력해 주세요"
                  label="이름"
                  name="이름"
                  onChange={handleChange}
                  required
                  value=""
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="핸드폰번호"
                  name="핸드폰번호"
                  onChange={handleChange}
                  required
                  value=""
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="주소"
                  name="주소"
                  onChange={handleChange}
                  required
                  value=""
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="상세주소"
                  name="상세주소"
                  onChange={handleChange}
                  required
                  value=""
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="요청사항"
                  name="요청사항"
                  onChange={handleChange}
                  required
                  value=""
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
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
          <Button variant="contained">
            구매
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default PurchaseData