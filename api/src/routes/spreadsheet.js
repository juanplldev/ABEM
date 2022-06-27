// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User, Spreadsheet} = require("../db");
const {verifyToken} = require("../controllers/tokens");
const {API_KEY} = process.env;

router.get("/spreadsheet", async (req, res) => {
    const {apiKey} = req.query;
    
    if(apiKey === API_KEY)
    {
        try
        {
            const {authorization} = req.headers;
            
            if(authorization)
            {
                const token = authorization.split(" ").pop();
                const tokenData = await verifyToken(token);
                const userID = tokenData !== undefined ? tokenData.id : null;
                
                if(userID)
                {
                    const foundUser = await User.findByPk(userID, {
                        include:
                        {
                            model: Spreadsheet,
                        },
                    });
                    
                    if(foundUser !== null && foundUser !== undefined)
                    {
                        res.send(foundUser.Spreadsheets);
                    }
                    else
                    {
                        res.status(404).send("Incorrect user.");
                    };
                }
                else
                {
                    res.status(409).send("Invalid token.");
                };
            }
            else
            {
                res.status(404).send("All fields are required.");
            };
        }
        catch(error)
        {
            console.log(error);
        };
    }
    else
    {
        res.send("No authorization.");
    };
});


router.post("/spreadsheet", async (req, res) => {
    const {
        client,
        month,
        grossPayoutETH,
        grossPayoutUSDT,
        grossPayoutPercentage,
        energyCostETH,
        energyCostUSDT,
        energyCostPercentage,
        managementFeETH,
        managementFeUSDT,
        managementFePercentage,
        netPayoutETH,
        netPayoutUSDT,
        netPayoutPercentage,
    } = req.body;
    
    try
    {
        if(client, month, grossPayoutETH, grossPayoutUSDT, grossPayoutPercentage, energyCostETH, energyCostUSDT, energyCostPercentage, managementFeETH, managementFeUSDT, managementFePercentage, netPayoutETH, netPayoutUSDT, netPayoutPercentage)
        {
            const foundUser = await User.findOne({
                where:
                {
                    name: client,
                },
            });
            
            if(foundUser !== null)
            {
                const newSpreadsheet = await Spreadsheet.create({
                    client,
                    month,
                    grossPayoutETH,
                    grossPayoutUSDT,
                    grossPayoutPercentage,
                    energyCostETH,
                    energyCostUSDT,
                    energyCostPercentage,
                    managementFeETH,
                    managementFeUSDT,
                    managementFePercentage,
                    netPayoutETH,
                    netPayoutUSDT,
                    netPayoutPercentage,
                });
                await foundUser.addSpreadsheet(newSpreadsheet);
                
                res.send("The spreadsheet was successfully created!");
            }
            else
            {
                res.status(404).send("No user found.");
            }
        }
        else
        {
            res.status(404).send("All fields are required.");
        };
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;