// Dependencies
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Navigate} from "react-router-dom";
import swal from "sweetalert";
// Files
import {getUsers, addSpreadsheet} from "../../redux/actions/actions";
import styles from "./AddSpreadsheet.module.css";


function AddSpreadsheet()
{
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const isAdmin = userDataJson ? userDataJson.is_Admin : false;
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        client: "",
        month: "",
        grossPayoutETH: "",
        grossPayoutUSDT: "",
        grossPayoutPercentage: "",
        energyCostETH: "",
        energyCostUSDT: "",
        energyCostPercentage: "",
        managementFeETH: "",
        managementFeUSDT: "",
        managementFePercentage: "",
        netPayoutETH: "",
        netPayoutUSDT: "",
        netPayoutPercentage: "",
    });
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getUsers()), [dispatch]);
    
    function handleGoBack(e)
    {
        e.preventDefault();
        navigate("/payout");
    };
    
    function validate(input)
    {
        const errors = {};
        const foundUsername = users.filter(e => e.name === input.client);
        
        if(!input.client)
        {
            errors.client = <font></font>;
        }
        else if(!foundUsername.length)
        {
            errors.client = <p>User not found. Check if it is well written.</p>
        }
        else if(!input.month)
        {
            errors.month = <font></font>;
        }
        else if(!input.grossPayoutETH)
        {
            errors.grossPayoutETH = <font></font>;
        }
        else if(!input.grossPayoutUSDT)
        {
            errors.grossPayoutUSDT = <font></font>;
        }
        else if(!input.grossPayoutPercentage)
        {
            errors.grossPayoutPercentage = <font></font>;
        }
        else if(!input.energyCostETH)
        {
            errors.energyCostETH = <font></font>;
        }
        else if(!input.energyCostUSDT)
        {
            errors.energyCostUSDT = <font></font>;
        }
        else if(!input.energyCostPercentage)
        {
            errors.energyCostPercentage = <font></font>;
        }
        else if(!input.managementFeETH)
        {
            errors.managementFeETH = <font></font>;
        }
        else if(!input.managementFeUSDT)
        {
            errors.managementFeUSDT = <font></font>;
        }
        else if(!input.managementFePercentage)
        {
            errors.managementFePercentage = <font></font>;
        }
        else if(!input.netPayoutETH)
        {
            errors.netPayoutETH = <font></font>;
        }
        else if(!input.netPayoutUSDT)
        {
            errors.netPayoutUSDT = <font></font>;
        }
        else if(!input.netPayoutPercentage)
        {
            errors.netPayoutPercentage = <font></font>;
        }
        
        return errors;
    };
    
    function handleChange(e)
    {
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validate({...input, [e.target.name] : e.target.value}));
        // console.log(input);
    };
    
    function handleSubmit(e)
    {
        const regExp = /^[A-Za-z0-9]+/;
        let verified = [];
        
        for (let key in input)
        {
            const verify = regExp.test(input[key]);
            verified.push(verify);
        };
        
        if(Object.keys(validate(input)).length > 0)
        {
            e.preventDefault();
            swal("Please fill all fields correctly.");
        }
        else
        {
            if(verified.includes(false))
            {
                e.preventDefault();
                swal("Please fill the fields without symbols.");
            }
            else
            {
                e.preventDefault();
                dispatch(addSpreadsheet(input));
                setInput({
                    client: "",
                    month: "",
                    grossPayoutETH: "",
                    grossPayoutUSDT: "",
                    grossPayoutPercentage: "",
                    energyCostETH: "",
                    energyCostUSDT: "",
                    energyCostPercentage: "",
                    managementFeETH: "",
                    managementFeUSDT: "",
                    managementFePercentage: "",
                    netPayoutETH: "",
                    netPayoutUSDT: "",
                    netPayoutPercentage: "",
                });
                swal("The spreadsheet was successfully created!");
                navigate("/payout");
            };
        };
    };
    
    if(isAdmin)
    {
        return(
            <div>
                <button className={styles.GoBack} onClick={handleGoBack} >Go back</button>
                
                <div className={styles.Container}>
                    <form onSubmit={handleSubmit} className={styles.Form}>
                        <div>
                            <input className={errors.client ? styles.FirstInputAlert : styles.FirstInput} onChange={handleChange} type="text" placeholder="Cliente" name="client"/>
                            {
                                errors.client && errors.client
                            }
                        </div>
                        <div>
                            <input className={errors.month ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Mes" name="month"/>
                            {
                                errors.month && errors.month
                            }
                        </div>
                        
                        <div>
                            <input className={errors.grossPayoutETH ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Payout bruto ETH" name="grossPayoutETH"/>
                            {
                                errors.grossPayoutETH && errors.grossPayoutETH
                            }
                        </div>
                        <div>
                            <input className={errors.grossPayoutUSDT ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Payout bruto USDT" name="grossPayoutUSDT"/>
                            {
                                errors.grossPayoutUSDT && errors.grossPayoutUSDT
                            }
                        </div>
                        <div>
                            <input className={errors.grossPayoutPercentage ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Payout bruto %" name="grossPayoutPercentage"/>
                            {
                                errors.grossPayoutPercentage && errors.grossPayoutPercentage
                            }
                        </div>
                        
                        <div>
                            <input className={errors.energyCostETH ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Costo Energia ETH" name="energyCostETH"/>
                            {
                                errors.energyCostETH && errors.energyCostETH
                            }
                        </div>
                        <div>
                            <input className={errors.energyCostUSDT ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Costo Energia USDT" name="energyCostUSDT"/>
                            {
                                errors.energyCostUSDT && errors.energyCostUSDT
                            }
                        </div>
                        <div>
                            <input className={errors.energyCostPercentage ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Costo Energia %" name="energyCostPercentage"/>
                            {
                                errors.energyCostPercentage && errors.energyCostPercentage
                            }
                        </div>
                        
                        <div>
                            <input className={errors.managementFeETH ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Management Fee ETH" name="managementFeETH"/>
                            {
                                errors.managementFeETH && errors.managementFeETH
                            }
                        </div>
                        <div>
                            <input className={errors.managementFeUSDT ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Management Fee USDT" name="managementFeUSDT"/>
                            {
                                errors.managementFeUSDT && errors.managementFeUSDT
                            }
                        </div>
                        <div>
                            <input className={errors.managementFePercentage ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Management Fee %" name="managementFePercentage"/>
                            {
                                errors.managementFePercentage && errors.managementFePercentage
                            }
                        </div>
                        
                        <div>
                            <input className={errors.netPayoutETH ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Payout Neto EHT" name="netPayoutETH"/>
                            {
                                errors.netPayoutETH && errors.netPayoutETH
                            }
                        </div>
                        <div>
                            <input className={errors.netPayoutUSDT ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Payout Neto USDT" name="netPayoutUSDT"/>
                            {
                                errors.netPayoutUSDT && errors.netPayoutUSDT
                            }
                        </div>
                        <div>
                            <input className={errors.netPayoutPercentage ? styles.Alert : styles.Input} onChange={handleChange} type="text" placeholder="Payout Neto %" name="netPayoutPercentage"/>
                            {
                                errors.netPayoutPercentage && errors.netPayoutPercentage
                            }
                        </div>
                        
                        <button className={styles.SubmitButton} type="submit">Upload</button>
                    </form>
                </div>
            </div>
        );
    }
    else
    {
        return(<Navigate to="/payout"/>);
    }
};


export default AddSpreadsheet;