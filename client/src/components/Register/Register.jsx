// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import swal from "sweetalert";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
// Files
import {getUsers, register} from "../../redux/actions/actions";
import styles from "./Register.module.css";


function Register()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        dni: "",
        email: "",
        phone: "",
        password: "",
        repeatPassword: "",
    });
    const [password, setPassword] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        const foundUsername = users.filter(e => e.name === input.name);
        const foundEmail = users.filter(e => e.email === input.email);
        const foundDni = users.filter(e => e.dni === input.dni);
        console.log(foundUsername);
        if(!input.name)
        {
            errors.name = <font color="red">*</font>;
        }
        else if(foundUsername.length)
        {
            errors.name = <p className={styles.Alert}>This name is already in use. Please try another.</p>;
        }
        else if(!input.dni)
        {
            errors.dni = <font color="red">*</font>;
        }
        else if(input.dni.length < 7 || input.dni.length > 8)
        {
            errors.dni = <p className={styles.Alert}>Enter a valid DNI.</p>;
        }
        else if(foundDni.length)
        {
            errors.dni = <p className={styles.Alert}>This dni is already in use. Please try another.</p>;
        }
        else if(!input.email)
        {
            errors.email = <font color="red">*</font>;
        }
        else if(foundEmail.length)
        {
            errors.email = <p className={styles.Alert}>This email is already in use. Please try another.</p>;
        }
        else if(!input.phone)
        {
            errors.phone = <font color="red">*</font>;
        }
        else if(!input.password)
        {
            errors.password = <font color="red">*</font>;
        }
        else if(input.password.length < 8)
        {
            errors.password = <p className={styles.Alert}>The password must contain at least 8 characters.</p>;
        }
        else if(input.password !== input.repeatPassword)
        {
            errors.repeatPassword = <p className={styles.Alert}>Passwords doesn't match.</p>;
        };
        
        return errors;
    };
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input, [e.target.name] : e.target.value}));
        // console.log(input);
    };
    
    function handleShowPassword(e)
    {
        e.preventDefault(e);
        setPassword(password => !password);
    };
    
    function handleSubmit(e)
    {
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("All fields are required.");
        }
        else
        {
            e.preventDefault();
            dispatch(register(input));
            setInput({
                name: "",
                dni: "",
                email: "",
                phone: "",
                password: "",
            });
            swal("The user was successfully created!");
            navigate("/login");
        };
    };
    
    
    return(
        <div className={styles.Container}>
            <form onSubmit={e => handleSubmit(e)} className={styles.Form} >
                <div>
                    <input className={styles.Input} onChange={e => handleChange(e)} type="text" placeholder="Full name" name="name"/>
                    {
                        errors.name && errors.name
                    }
                </div>
                
                <div>
                    <input className={styles.Input} onChange={e => handleChange(e)} type="number" placeholder="DNI" name="dni"/>
                    {
                        errors.dni && errors.dni
                    }
                </div>
                
                <div>
                    <input className={styles.Input} onChange={e => handleChange(e)} type="email" placeholder="Email" name="email"/>
                    {
                        errors.email && errors.email
                    }
                </div>
                
                <div>
                    <input className={styles.Input} onChange={e => handleChange(e)} type="number" placeholder="Phone" name="phone"/>
                    {
                        errors.phone && errors.phone
                    }
                </div>
                
                <div>
                    <input className={styles.Input} onChange={e => handleChange(e)} type={password ? "text" : "password"} placeholder="Password" name="password"/>
                    {
                        errors.password && errors.password
                    }
                    <button className={styles.ShowPassword} onClick={handleShowPassword} type="button">
                        {
                            password ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                        }
                    </button>
                </div>
                
                <div>
                    <input className={styles.Input} onChange={e => handleChange(e)} type="password" placeholder="Repeat password" name="repeatPassword"/>
                    {
                        errors.repeatPassword && errors.repeatPassword
                    }
                </div>
                
                <button className={styles.SubmitButton} type="submit">Register</button>
                
                <p>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </form>
        </div>
    );
};


export default Register;