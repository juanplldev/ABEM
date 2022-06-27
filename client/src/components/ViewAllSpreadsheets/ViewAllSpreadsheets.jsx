// Dependencies
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
// Files
import {getSpreadsheet} from "../../redux/actions/actions";
import styles from "./ViewAllSpreadsheets.module.css";


function ViewAllSpreadsheets()
{
    const dispatch = useDispatch();
    const userSpreadsheets = useSelector(state => state.userSpreadsheets);
    const lastSpreadsheet = userSpreadsheets.length && userSpreadsheets.pop();
    const loggedUser = window.localStorage.getItem("userData");
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getSpreadsheet(loggedUser)), [dispatch, loggedUser]);
    
    function handleGoBack(e)
    {
        e.preventDefault();
        navigate("/payout");
    };
    
    if(loggedUser)
    {
        if(lastSpreadsheet)
        {
            return(
                <div>
                    <button className={styles.GoBack} onClick={handleGoBack} >Go back</button>
                    
                    {
                        userSpreadsheets.map(e => {
                            return(
                                <div className={styles.Spreadsheet}>
                                    <h2>Mes: {e.month}</h2>
                                    <table>
                                        <tr>
                                            <th style={{fontWeight : "bold"}}>P&L</th>
                                            <th style={{fontWeight : "bold"}}>ETH</th>
                                            <th style={{fontWeight : "bold"}}>USDT</th>
                                            <th style={{fontWeight : "bold"}}>%</th>
                                        </tr>
                                        <tr>
                                            <td style={{fontWeight : "bold"}}>Payout Bruto</td>
                                            <td style={{fontWeight : "bold"}}>{e.grossPayoutETH}</td>
                                            <td style={{fontWeight : "bold"}}>${e.grossPayoutUSDT}</td>
                                            <td style={{fontWeight : "bold"}}>{e.grossPayoutPercentage}%</td>
                                        </tr>
                                        <tr>
                                            <td>(-) Costo Energia</td>
                                            <td>-{e.energyCostETH}</td>
                                            <td>-${e.energyCostUSDT}</td>
                                            <td>{e.energyCostPercentage}%</td>
                                        </tr>
                                        <tr>
                                            <td>(-) Management Fee</td>
                                            <td>-{e.managementFeETH}</td>
                                            <td>-${e.managementFeUSDT}</td>
                                            <td>{e.managementFePercentage}%</td>
                                        </tr>
                                        <tr>
                                            <td style={{fontWeight : "bold"}}>Payout Neto</td>
                                            <td style={{fontWeight : "bold"}}>{e.netPayoutETH}</td>
                                            <td style={{fontWeight : "bold"}}>${e.netPayoutUSDT}</td>
                                            <td style={{fontWeight : "bold"}}>{e.netPayoutPercentage}%</td>
                                        </tr>
                                    </table>
                                </div>
                            );
                        })
                    }
                    
                    <button className={styles.GoBack} onClick={handleGoBack} >Go back</button>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    <h1>Todavía no hay datos.</h1>
                </div>
            );
        };
    }
    else
    {
        return(<Navigate to="/login"/>);
    };
};


export default ViewAllSpreadsheets;