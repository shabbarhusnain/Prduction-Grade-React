import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter} from 'react-router-dom'
import Store from './Store/Store'
import {Provider} from 'react-redux'
import {RouterProvider} from 'react-router-dom'
import {AddPost,AllPost,EditPost,Home,MyPost,Post,SigninPage,SignupPage,Signout} from './Pages/Index.js'
import AuthLayer from './Components/AuthLayer.jsx'
import DeletePost from './Pages/DeletePost.jsx'

const Routes= createBrowserRouter(
  [{
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element:(
        <Home/>
      )
      },
      {
        path:'/add-post/:userId',
        element:(<AuthLayer authentication to={'/add-post'}><AddPost/></AuthLayer>)
      },
      {
        path:'/all-post',
        element:(<AuthLayer authentication to={'/all-post'}><AllPost/></AuthLayer>)
      },
      {
        path:'/edit-post/:id',
        element:(<AuthLayer authentication to={'/edit-post/id'}><EditPost/></AuthLayer>)
      },{
        path:'/delete-post/:id',
        element:(<AuthLayer authentication to={'/delete-post/id'}><DeletePost/></AuthLayer>)
      },
      {
        path:'/my-post',
        element:(<AuthLayer authentication to={'/my-post'}><MyPost/></AuthLayer>)
      },
      {
        path:'/post/:id',
        element:(<AuthLayer authentication to={'/post/:id'}><Post/></AuthLayer>)
      },{
        path:'/signin-page',
        element:(<AuthLayer authentication={false} ><SigninPage/></AuthLayer>)
      },
      {
        path:'/signup-page',
        element:(<AuthLayer authentication={false} ><SignupPage/></AuthLayer>)
      },
      {
        path:'/signout',
        element:(<AuthLayer authentication ><Signout/></AuthLayer>)
      }
    ]
  }]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={Routes}/>
    </Provider>
  </StrictMode>,
)
