// Files
import {REGISTER, LOGIN, GET_PROFILE, GET_USERS, GET_SPREADSHEET, POST_SPREADSHEET} from "../actions/actions";


const initialState =
{
    user: {},
    users: [],
    userSpreadsheets: [],
};


function rootReducer(state = initialState, {type, payload})
{
    switch(type)
    {
        case REGISTER:
            return {...state};
        
        case LOGIN:
            return {...state, user: payload};
        
        case GET_PROFILE:
            return {...state, user: payload};
        
        case GET_USERS:
            return {...state, users: payload};
        
        case GET_SPREADSHEET:
            return {...state, userSpreadsheets: payload};
        
        case POST_SPREADSHEET:
            return {...state, user: payload};
        
        default:
            return {...state};
    };
};


export default rootReducer;