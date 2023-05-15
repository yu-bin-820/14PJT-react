import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.ts';

import Main from '@pages/Main';
import SignIn from '@/pages/User/SignIn';
import Top from './layouts/Top';

import ManageProducts from '@pages/Product/ManageProductList/index.tsx';
import Products from '@pages/Product/ProductList/index.tsx';
import ErrorPage from '@pages/Common/ErrorPage';
import ManageUsers from '@pages/User/ManageUsers';
import ProductDetail from '@pages/Product/ProductDetail/index.tsx';
import Purchase from './pages/Purchase/PurchaseAdd/index.tsx';
import NestedModal from './pages/Product/test/index.tsx';
import BranchesAddr from './pages/branchesAddr/index.tsx';
import PurchaseList from './pages/Purchase/Purchases/index.tsx';
import SignUp from './pages/User/SignUp/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Top />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'manage',
        children: [
          {
            path: 'user',
            children: [
              {
                path: 'list',
                element: <ManageUsers />,
              },
              {
                path: 'detail',
              },
            ],
          },
          {
            path: 'product',
            children: [
              {
                path: 'list',
                element: <ManageProducts />,
              },
              {
                path: 'detail',
              },
            ],
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'signin',
            element: <SignIn />,
          },
          {
            path: 'signup',
            element: <SignUp />,
          },
        ],
      },
      {
        path: 'product',
        children: [
          {
            path: 'list',
            element: <Products />,
          },
          {
            path: 'detail/productno/:productNo',
            element: <ProductDetail />,
          },
          {
            path: 'test',
            element: <NestedModal/>
          },
        ],
      },
      {
        path: 'branch',
        element: <BranchesAddr/>
      },
      {
      path: 'purchase',
      children: [
        {
          path: 'add/:productNo',
          element: <Purchase />,
        },
        {
          path: 'list',
          element: <PurchaseList />,
        }
      ],
    },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <RouterProvider router={router} />
    </CssBaseline>
  </ThemeProvider>
);
