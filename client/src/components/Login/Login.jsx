// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
// Files
import {getUsers, login} from "../../redux/actions/actions";
import styles from "./Login.module.css";


function Login()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        user: "",
        password: "",
    });
    const [/*user*/, setUser] = useState(null);
    // Show or hide password
    const [password, setPassword] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function validate(input)
    {
        const errors = {};
        
        if(!input.user)
        {
            errors.user = <font color="red">*</font>;
        }
        else if(!input.password)
        {
            errors.password = <font color="red">*</font>;
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
        const foundUsername = users.filter(e => e.name === input.user);
        const foundEmail = users.filter(e => e.email === input.user);
        const foundDni = users.filter(e => e.dni === input.user);
        
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Please fill all fields correctly.");
        }
        else
        {
            if((foundUsername.length || foundEmail.length || foundDni.length))
            {
                e.preventDefault();
                const data = await dispatch(login(input)).catch(error => console.log(error));
                
                if(data === undefined || data === null)
                {
                    swal("Incorrect user or password.");
                }
                else
                {
                    const payload = data.payload;
                    const userData =
                    {
                        id: payload.foundUser[0].id,
                        name: payload.foundUser[0].name,
                        email: payload.foundUser[0].email,
                        dni: payload.foundUser[0].dni,
                        token: payload.token,
                        is_Admin: payload.foundUser[0].is_Admin,
                    };
                    
                    window.localStorage.setItem("userData", JSON.stringify(userData));
                    
                    // No se aplica porque esta dentro de una async function
                    setInput({
                        user: "",
                        password: "",
                    });
                    
                    setUser(userData);
                    // ------------------------------------------------------
                    swal("Loged.");
                    navigate("/payout");
                };
            }
            else
            {
                e.preventDefault();
                swal("Incorrect user or password.");
            };
        };
    };
    
    return(
        <div className={styles.Container}>
            <form onSubmit={handleSubmit} className={styles.Form}>
                <div>
                    <input className={styles.Input} onChange={handleChange} type="text" placeholder="Username or email" name="user"/>
                    {
                        errors.user && errors.user
                    }
                </div>
                <div className={styles.Input}>
                    <input className={styles.Input} onChange={handleChange} type={password ? "text" : "password"} placeholder="Password" name="password"/>
                    {
                        errors.password && errors.password
                    }
                    <button className={styles.ShowPassword} onClick={handleShowPassword} type="button">
                        {
                            password ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                        }
                    </button>
                </div>
                <button className={styles.SubmitButton} type="submit">Login</button>
                
                <p>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
                
                <Link to="/forgot">Forgot your password?</Link>
            </form>
        </div>
    );
};


export default Login;