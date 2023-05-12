import { ReactElement, ReactNode, forwardRef } from 'react';
import { Fade } from '@mui/material';

type Props = {
  children: ReactElement;
};

const FadeWithRef = forwardRef((props: Props, ref) => (
  <Fade {...props} ref={ref}>
    {props.children}
  </Fade>
));

export default FadeWithRef;
