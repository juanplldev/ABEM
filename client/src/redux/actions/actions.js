// Dependencies
import axios from "axios";
// Files
const {REACT_APP_URL, REACT_APP_API_KEY} = process.env;
const URL = REACT_APP_URL;


export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const PROFILE = "PROFILE";
export const GET_USERS = "GET_USERS";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";



export function register(values)
{
    return async function(dispatch)
    {
        const data = (await axios.post(`${URL}/register`, values)).data;
        return dispatch({type: REGISTER, payload: data});
    };
};

export function login(values)
{
    return async function(dispatch)
    {
        const data = (await axios.post(`${URL}/login`, values)).data;
        return dispatch({type: LOGIN, payload: data});
    };
};

export function profile(userData)
{
    return async function(dispatch)
    {
        if(userData !== null)
        {
            const userDataJson = JSON.parse(userData);
            const token = userDataJson.token;
            const config =
            {
                headers:
                {
                    authorization: `Bearer ${token}`,
                },
            };
            const data = (await axios(`${URL}/profile?apiKey=${REACT_APP_API_KEY}`, config)).data;
            return dispatch({type: PROFILE, payload: data});
        };
    };
};

export function getUsers()
{
    return async function(dispatch)
    {
        const data = (await axios(`${URL}/users?apiKey=${REACT_APP_API_KEY}`)).data;
        return dispatch({type: GET_USERS, payload: data});
    };
};

export function forgotPassword(user)
{
    return async function(dispatch)
    {
        const data = (await axios.post(`${URL}/forgot`, user)).data;
        return dispatch({type: FORGOT_PASSWORD, payload: data});
    };
};

export function resetPassword(id, resetToken, input)
{
    return async function(dispatch)
    {
        if(resetToken !== null)
        {
            const resetTokenJson = JSON.parse(resetToken);
            const token = resetTokenJson.token;
            const config =
            {
                headers:
                {
                    authorization: `Bearer ${token}`,
                },
            };
            const data = (await axios.put(`${URL}/reset/${id}`, input, config)).data;
            return dispatch({type: RESET_PASSWORD, payload: data});
        };
    };
};