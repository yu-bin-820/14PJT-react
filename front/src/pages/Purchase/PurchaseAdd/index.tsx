
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { PurchaseData } from '@/components/PurchaseAdd/purchaseData';
import PurchaseInput from '@/components/PurchaseAdd/purchaseInput';

const Purchase = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 13
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>

          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
              >
                <PurchaseData />
              </Grid>
              <Grid
                xs={12}
              >
                <PurchaseInput />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);


export default Purchase;