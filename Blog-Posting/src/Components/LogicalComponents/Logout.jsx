import React, { useEffect } from 'react'
import authService from '../../Backend/AuthService'
import {logout} from '../../Store/AuthSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Signout() {
    const dispatch =useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
    const performSignout = async () => {
      try {
        await authService.Signout().then(()=>dispatch(logout()));
      } catch (error) {
        console.error('Signout error:', error);
      } finally {
        dispatch(logout());
        navigate('/', { replace: true });
      }
    };

    performSignout();
  }, [dispatch, navigate]);
    
  return null
}
export default Signout