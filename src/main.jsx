import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import NuevoCliente,{action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, {loader as clientesLoader} from './pages/Index'
import ErrorPages from './components/ErrorPages'
import EditarClient,{loader as loaderEditClient, action as EditarClienteAction } from './pages/EditarClient'
import {action as clienteDeleteAction} from './components/Clientes'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPages />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente/>,
        action: nuevoClienteAction,
        errorElement: <ErrorPages />

      },
      
      {
        path: '/clientes/:clienteid/editar',
        element: <EditarClient/>,
        loader:loaderEditClient,
        action: EditarClienteAction,
        errorElement: <ErrorPages />
      },

      {
        path: '/clientes/:clienteid/delete',       
        action: clienteDeleteAction,
      },
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
