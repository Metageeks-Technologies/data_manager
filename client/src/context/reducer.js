import {
    API_CALL_BEGIN,
    API_CALL_FAIL,
    SET_FILE,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGOUT_USER,
    GET_ALL_DATA_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    UPLOAD_DATA_SUCCESS,
    UPLOAD_DATA_FAIL,
    EDIT_DATA_BEGIN,
    EDIT_DATA_FAIL,
    EDIT_DATA_SUCCESS,
    GET_ALL_EDIT_REQUEST_SUCCESS,
    APPROVE_EDIT_SUCCESS,
    REJECT_EDIT_SUCCESS,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_FAIL,
    DELETE_USER_SUCCESS,
    OPEN_SEARCH_BAR,
    CHANGE_PASSWORD_SUCCESS,
    GET_USER_BEGIN,
    DELETE_DATA_SUCCESS,
    GET_ALL_DELETED_DATA_SUCCESS,
    YEAR_PICKER,
    IS_SEARCHED
    
    
   
} from './action'

const reducer =(state,action)=>{
    
    if( action.type===API_CALL_BEGIN ||action.type=== EDIT_DATA_BEGIN){
        return{
            ...state,
            isLoading:true         
        }
    }
    if( action.type===DELETE_DATA_SUCCESS){
        return{
            ...state,
            toggleAction:!state.toggleAction,
            isLoading:false ,

        }
    }
    if(action.type=== EDIT_DATA_BEGIN){
        return{
           
            ...state,
            
            isLoading:true         
        }
    }
    if(action.type===GET_USER_SUCCESS){
        return {
            ...state,
            userLoading:false,
            isAuthenticated:true,
            user:action.payload,
            isAdmin:action.payload?.role==="admin",
            
        }
    }
    if(action.type===GET_USER_FAIL){
        return {
            ...state,
            userLoading:false,
            isAuthenticated:false
        }
    }
    if(action.type===GET_USER_BEGIN){
        return {
            ...state,
            userLoading:true,
        }
    }
    if(action.type===API_CALL_FAIL){
        return {
            ...state,
            isLoading:false,
        }
    }
    if(action.type==LOGIN_USER_FAIL || action.type===SIGNUP_USER_FAIL){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:false,
            user:null,
        }
    }
    if(action.type===LOGOUT_USER){
        return {
            ...state,
            user:null,
            isAuthenticated:false,
            isAdmin:false
        }
    }
    if(action.type===YEAR_PICKER){
        return {
            ...state,
            yearPicker:action.payload
        }
    }
    if(action.type===IS_SEARCHED){
        return {
            ...state,
            isSearched:action.payload
        }
    }

    
    if(action.type===LOGIN_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
            isAdmin:action.payload?.role==="admin",
           

        }
    }
    
    if(action.type===SIGNUP_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
            isAdmin:action.payload?.role==="admin",
            
        }
    }
    if(action.type===GET_ALL_DATA_SUCCESS){
        return {
            ...state,
            isLoading:false,
           mainData:action.payload.result,
           pageInfo:action.payload.pageInfo,
           
            
        }
    }
    if(action.type===GET_ALL_DELETED_DATA_SUCCESS){
        return {
            ...state,
            isLoading:false,
           deletedData:action.payload.result,
           pageInfo:action.payload.pageInfo,
          
            
        }
    }
    if(action.type===SET_FILE){
        return {
            ...state,
           file:action.payload
          
            
        }
    }
    if(action.type===UPLOAD_DATA_SUCCESS || action.type===UPLOAD_DATA_FAIL ){
        return {
            ...state,
            file:null,
            isLoading:false,
           message:action.payload    
        }
    }
    if(action.type===EDIT_DATA_SUCCESS || action.type===EDIT_DATA_FAIL ){
        return {
            ...state,
            toggleAction:!state.toggleAction,
            isLoading:false,
             
        }
    }
    if(action.type===  GET_ALL_EDIT_REQUEST_SUCCESS ){
        return {
            ...state,
            editRequestData:action.payload,
            isLoading:false,
             
        }
    }
    if(action.type===APPROVE_EDIT_SUCCESS ||action.type=== REJECT_EDIT_SUCCESS ){
        return {
            ...state,
            editDataStatusChange:!state.editDataStatusChange,
            isLoading:false,
             
        }
    }
    if(action.type===GET_ALL_USERS_SUCCESS){
        return {
            ...state,
            isLoading:false,
            allUsers:action.payload.users,
            
        }
    }
    if(action.type===GET_ALL_USERS_FAIL){
        return {
            ...state,
            isLoading:false,
            allUsers:[],
            
        }
    }
    if(action.type===UPDATE_ROLE_SUCCESS ||action.type===UPDATE_ROLE_FAIL){
        return {
            ...state,
            toggleAction:!state.toggleAction,
            isLoading:false,
            
            
        }
    }
    if(action.type===DELETE_USER_SUCCESS){
        return {
            ...state,
            toggleAction:!state.toggleAction,
            isLoading:false,   
        }
    }
    if(action.type===ADD_USER_SUCCESS){
        return {
            ...state,
            toggleAction:!state.toggleAction,
            isLoading:false,
               
        }
    }
    if(action.type===OPEN_SEARCH_BAR){
        return {
            ...state,
            openSearchBar:action.payload   
        }
    }
    if(action.type===CHANGE_PASSWORD_SUCCESS){
        return {
            ...state,  
        }
    }
    
    
    
    
    
   
    throw new Error(`no such action : ${action.type}`)
}
export default reducer;