// Dependencies
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
// Files
import {getSpreadsheet} from "../../redux/actions/actions";
import styles from "./ViewSpreadsheet.module.css";

function GetSpreadsheet()
{
    const dispatch = useDispatch();
    const userSpreadsheets = useSelector(state => state.userSpreadsheets);
    const lastSpreadsheet = userSpreadsheets.length && userSpreadsheets.pop();
    const loggedUser = window.localStorage.getItem("userData");
    const userDataJson = JSON.parse(loggedUser);
    const isAdmin = userDataJson ? userDataJson.is_Admin : false;
    const navigate = useNavigate();
    
    useEffect(() => dispatch(getSpreadsheet(loggedUser)), [dispatch, loggedUser]);
    
    function handleLogout(e)
    {
        e.preventDefault();
        window.localStorage.clear();
        navigate("/login");
    };
    
    function handleViewAll(e)
    {
        e.preventDefault();
        navigate("/allpayouts");
    };
    
    function handleAddSpreadsheet(e)
    {
        e.preventDefault();
        navigate("/spreadsheet");
    };
    
    if(loggedUser)
    {
        if(lastSpreadsheet)
        {
            return(
                <div className={styles.Container}>
                    <h2>Cliente: {lastSpreadsheet.client}</h2>
                    <h2>Mes: {lastSpreadsheet.month}</h2>
                    
                    <div className={styles.Spreadsheet}>
                        <table>
                            <tr>
                                <th style={{fontWeight : "bold"}}>P&L</th>
                                <th style={{fontWeight : "bold"}}>ETH</th>
                                <th style={{fontWeight : "bold"}}>USDT</th>
                                <th style={{fontWeight : "bold"}}>%</th>
                            </tr>
                            <tr>
                                <td style={{fontWeight : "bold"}}>Payout Bruto</td>
                                <td style={{fontWeight : "bold"}}>{lastSpreadsheet.grossPayoutETH}</td>
                                <td style={{fontWeight : "bold"}}>${lastSpreadsheet.grossPayoutUSDT}</td>
                                <td style={{fontWeight : "bold"}}>{lastSpreadsheet.grossPayoutPercentage}%</td>
                            </tr>
                            <tr>
                                <td>(-) Costo Energia</td>
                                <td>-{lastSpreadsheet.energyCostETH}</td>
                                <td>-${lastSpreadsheet.energyCostUSDT}</td>
                                <td>{lastSpreadsheet.energyCostPercentage}%</td>
                            </tr>
                            <tr>
                                <td>(-) Management Fee</td>
                                <td>-{lastSpreadsheet.managementFeETH}</td>
                                <td>-${lastSpreadsheet.managementFeUSDT}</td>
                                <td>{lastSpreadsheet.managementFePercentage}%</td>
                            </tr>
                            <tr>
                                <td style={{fontWeight : "bold"}}>Payout Neto</td>
                                <td style={{fontWeight : "bold"}}>{lastSpreadsheet.netPayoutETH}</td>
                                <td style={{fontWeight : "bold"}}>${lastSpreadsheet.netPayoutUSDT}</td>
                                <td style={{fontWeight : "bold"}}>{lastSpreadsheet.netPayoutPercentage}%</td>
                            </tr>
                        </table>
                    </div>
                    
                    <br />
                    <br />
                    
                    <button className={styles.ViewAll} onClick={handleViewAll} >View payout history</button>
                    
                    <br />
                    <br />
                    <br />
                    
                    <button className={styles.Logout} onClick={handleLogout} >Logout</button>
                    
                    <br />
                    <br />
                    
                    {
                        isAdmin ? <button className={styles.AddSpreadsheet}>Add spreadsheet</button>
                        : null
                    }
                </div>
            );
        }
        else
        {
            return(
                <div>
                    <h1>Todavía no hay payouts.</h1>
                    <button className={styles.Logout} onClick={handleLogout} >Logout</button>
                    
                    <br />
                    <br />
                    
                    {
                        isAdmin ? <button className={styles.AddSpreadsheet} onClick={handleAddSpreadsheet}>Add spreadsheet</button>
                        : null
                    }
                </div>
            );
        };
    }
    else
    {
        return(<Navigate to="/login"/>);
    };
};


export default GetSpreadsheet;