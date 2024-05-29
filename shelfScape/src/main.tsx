import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login }  from './components/Login.tsx'
import { Interest } from './components/Interest.tsx'
import { Items } from './components/Items.tsx'
import { CreateItem } from './components/CreateItem.tsx'
import { AuthProvider } from './components/AuthProvider.tsx'
import ProtectedRouter from './components/ProtectedRouter.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/",
    element: <ProtectedRouter />,
    children: [
      {
        path: "/Interest",
        element: <Interest />
      }
    ]
  },
  {
    path: "/Items",
    element: <Items />
  },
  {
    path: "/CreateItem",
    element: <CreateItem></CreateItem>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
