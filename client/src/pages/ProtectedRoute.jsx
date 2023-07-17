
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { Loader } from '../components';
import { useEffect } from 'react';
// useEffect
const ProtectedRoute = ({ children }) => {
  const { user,isAuthenticated,userLoading } = useAppContext();
  const navigate=useNavigate();
  
  
  useEffect(() => {
    if (!isAuthenticated  ) {
      console.log("first");
      navigate('/auth')
    }
  }, [isAuthenticated]);
   
 
  return children;
};

export default ProtectedRoute;