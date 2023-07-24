import {Links} from '../../utils/links'
import { Dashboard } from '../../components'


const ExecutiveDash = () => {
 
  return <Dashboard links={Links} hideSideBar={true} role={'executive'} ></Dashboard>
 
}
 
export default ExecutiveDash
