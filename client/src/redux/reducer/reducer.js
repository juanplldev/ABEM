// Files
import {REGISTER, LOGIN, PROFILE, GET_USERS} from "../actions/actions";


const initialState =
{
    user: {},
    users: [],
    session: {},
};


function rootReducer(state = initialState, {type, payload})
{
    switch(type)
    {
        case REGISTER:
            return {...state};
        
        case LOGIN:
            return {...state, user: payload};
        
        case PROFILE:
            return {...state, user: payload};
        
        case GET_USERS:
            return {...state, users: payload};
        
        default:
            return {...state};
    };
};


export default rootReducer;