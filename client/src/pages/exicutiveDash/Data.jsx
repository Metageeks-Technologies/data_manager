import React, { useState } from 'react'
import Work from "./Work";
import EData from './EditedData';
import { useAppContext } from '../../context/appContext';
const Data = () => {

 const{ toggleExeData } = useAppContext();


  
  return (
    <>
    {toggleExeData?(
      <Work/>
    ):(
    <EData/>
    )}
    </>
  )
}

export default Data
