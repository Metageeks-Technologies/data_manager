import {BrowserRouter,Route,Routes,useNavigate} from "react-router-dom"
import {LoginPage,ProtectedRoute } from "./pages"
import {AdminDash,Upload,Data,Team, Trash} from './pages/dashboard'
import { EditedData,Work, ExecutiveDash,Data as ExeData} from "./pages/exicutiveDash"
import { VerifierDash,Data as VerData,} from "./pages/verifierDash"
import { Alert } from "./components"

// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:5000');
// console.log(socket);

function App() {

 
  return (
    
    <BrowserRouter>
     {/*alert common for all  */}
     <Alert/> 
      <Routes>
         
        {/* admin */}
        <Route path="/auth" exact element={<LoginPage/>} />

        <Route path="/" element={<ProtectedRoute> <AdminDash/> </ProtectedRoute> } >
          <Route index element={<Data/>} />
          <Route  path="upload" element={<Upload/>} />
          <Route path="users" element={<Team/>} />
          <Route path="trash" element={<Trash/>} />
          



        </Route>
        {/* executive */}
        <Route exact path="/executive" element={<ProtectedRoute> <ExecutiveDash/> </ProtectedRoute>} >
          <Route index element={<ExeData/>} />
          

        </Route>
         {/* verifier  */}
         <Route path="/verifier" element={<ProtectedRoute> <VerifierDash/> </ProtectedRoute> } >
          <Route index element={<VerData/>} />
        </Route>
        {/* login page */}
        {/* Not Found */}
        <Route path="*" element={<h1 className="flex justify-center items-center text-[3rem]">Not Found 404</h1>} /> 

        

      </Routes>
    </BrowserRouter>
  )
}






export default App
