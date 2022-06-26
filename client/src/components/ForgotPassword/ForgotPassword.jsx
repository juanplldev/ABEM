// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import swal from "sweetalert";
// Files
import {getUsers, forgotPassword} from "../../redux/actions/actions";
import styles from "./ForgotPassword.module.css";


function ForgotPassword()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        user: "",
    });
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.user)
        {
            errors.user = <font color="red">*</font>;
        };
        
        return errors;
    };
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input,[e.target.name] : e.target.value}));
        // console.log(input);
    };
    
    async function handleSubmit(e)
    {
        const foundUsername = users.filter(e => e.userName === input.user);
        const foundEmail = users.filter(e => e.email === input.user);
        
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Please enter a user.");
        }
        else
        {
            if((foundUsername.length || foundEmail.length))
            {
                e.preventDefault();
                const data = await dispatch(forgotPassword(input)).catch(e => swal("An error ocurred. Please, try again later."));
                
                if(data !== undefined && data !== null && data.payload)
                {
                    swal("The mail was send. Check your inbox.");
                    
                    const resetToken =
                    {
                        token: data.payload,
                    };
                    
                    window.localStorage.setItem("resetToken", JSON.stringify(resetToken));
                };
            }
            else
            {
                e.preventDefault();
                swal("Cannot find any user with tihs username or email.");
            };
        };
    };
    
    return(
        <div className={styles.Container}>
            <form onSubmit={handleSubmit} className={styles.Form}>
                <h2>Find Your Account</h2>
                <div>
                    <input className={styles.Input} onChange={handleChange} type="text" placeholder="Username or email" name="user"/>
                    {
                        errors.user && errors.user
                    }
                </div>
                <button className={styles.SubmitButton} type="submit">Search</button>
            </form>
        </div>
    );
};


export default ForgotPassword;