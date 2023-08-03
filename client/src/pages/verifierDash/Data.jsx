import React from 'react'
import Work from "./Work";
import Vdata from './Vdata';

import { useAppContext } from '../../context/appContext';
const Data = () => {

 const{ toggleExeData } = useAppContext();


  
  return (
    <>
    {!toggleExeData?(
      <Vdata/>
    ):(
    
    <Work/>
    )}
    </>
  )
}

export default Data
