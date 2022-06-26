// Dependencies
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import swal from "sweetalert";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
// Files
import {resetPassword} from "../../redux/actions/actions";
import styles from "./ResetPassword.module.css";


function ResetPassword()
{
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        password: "",
        repeatPassword: "",
    });
    // Show or hide password
    const [password, setPassword] = useState(false);
    const {id} = useParams();
    const resetToken = window.localStorage.getItem("resetToken");
    const navigate = useNavigate();
    
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.password)
        {
            errors.password = <font color="red">*</font>;
        }
        else if(input.password !== input.repeatPassword)
        {
            errors.repeatPassword = <p className={styles.Alert}>Passwords don't match.</p>;
        };
        
        return errors;
    };
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input,[e.target.name] : e.target.value}));
        // console.log(input);
    };
    
    function handleShowPassword(e)
    {
        e.preventDefault(e);
        setPassword(password => !password);
    };
    
    async function handleSubmit(e)
    {
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Please enter a password.");
        }
        else
        {
            e.preventDefault();
            const data = await dispatch(resetPassword(id, resetToken, input)).catch(e => swal("Invalid id or expired token."));
            console.log(data);
            
            if(data !== true)
            {
                swal("Password updated.");
                navigate("/login");
            };
        };
    };
    
    return(
        <div className={styles.Container}>
            <form onSubmit={handleSubmit} className={styles.Form}>
                <h2>Reset your password</h2>
                <div>
                    <input className={styles.Input} onChange={handleChange} type={password ? "text" : "password"} placeholder="Password" name="password"/>
                    {
                        errors.password && errors.password
                    }
                </div>
                <button className={styles.ShowPassword} onClick={handleShowPassword} type="button">
                    {
                        password ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                    }
                </button>
                <div>
                    <input className={styles.Input} onChange={e => handleChange(e)} type="password" placeholder="Repeat password" name="repeatPassword"/>
                    {
                        errors.repeatPassword && errors.repeatPassword
                    }
                </div>
                <button className={styles.SubmitButton} type="submit">Reset</button>
            </form>
        </div>
    );
};


export default ResetPassword;