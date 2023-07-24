
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { Loader } from '../components';
import { useEffect } from 'react';
// useEffect
const ProtectedRoute = ({ children }) => {
  const { user,isAuthenticated,userLoading } = useAppContext();
  const navigate=useNavigate();
  
  
  useEffect(() => {

    if (!user) {
      
      navigate('/auth')
    }
  }, [user]);
   
 
  if(userLoading){
    return(
      <div className="fixed top-0 left-0 right-0 bottom-0  flex items-center justify-center">
            <Loader />
      </div>
    )
  }
  return children;
};

export default ProtectedRoute;