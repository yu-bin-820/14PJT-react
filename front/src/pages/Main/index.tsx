import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import ProductList from '../Product/ProductList';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Main() {
  return (
    <>
    <Container
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'clip',
        marginTop: '64px',
      }}
    >
      <ImageList
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
       
        cols={1}
        
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={1}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
    <ProductList/>
    </>
  );
}

const itemData = [
  {
    img: 'https://www.bhc.co.kr/images/index/banner/img_main_banner_230418_1.jpg',
    title: 'Breakfast',
    rows: 4,
    cols: 4,
  },
  {
    img: 'https://www.bhc.co.kr/images/index/banner/img_main_banner_220418_6.jpg',
    title: 'Burger',
    rows: 4,
    cols: 4,
  },
];
