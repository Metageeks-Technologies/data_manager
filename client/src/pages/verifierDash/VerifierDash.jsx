import React from 'react'
import {verLinks} from '../../utils/links'
import { Dashboard } from '../../components'

const VerifierDash = () => {
  return (
     <Dashboard links={verLinks} hideSideBar={true} role={"verifier"} ></Dashboard>
  )
}

export default VerifierDash

