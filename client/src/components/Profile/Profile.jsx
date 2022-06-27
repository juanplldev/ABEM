// Dependencies
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
// Files
import {getProfile} from "../../redux/actions/actions";
import styles from "./Profile.module.css";

function Profile()
{
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const loggedUser = window.localStorage.getItem("userData");
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getProfile(loggedUser)), [dispatch, loggedUser]);
    
    function handleLogout(e)
    {
        e.preventDefault();
        window.localStorage.clear();
        navigate("/login");
    };
    
    if(user && loggedUser)
    {
        return(
            <div className={styles.Container}>
                <h1>User info</h1>
                <h2>Name:</h2>
                <h3>{user.name}</h3>
                <h2>Last name:</h2>
                <h3>{user.lastName}</h3>
                <h2>Username:</h2>
                <h3> {user.userName}</h3>
                <h2>Email:</h2>
                <h3> {user.email}</h3>
                <button className={styles.Logout} onClick={handleLogout} >Logout</button>
            </div>
        );
    }
    else
    {
        return(<Navigate to="/login"/>);
    };
};


export default Profile;