// Dependencies
const {Router} = require("express");
const router = Router();
const {Op} = require("sequelize");
// Files
const {User, Spreadsheet} = require("../db");
const {compare} = require("../controllers/bcrypt");
const {signToken} = require("../controllers/tokens");


router.get("/spreadsheet/:id", async (req, res) => {
    const {id} = req.params;
    
    try
    {
        if(id)
        {
            const foundUser = await User.findByPk(id, {
                include:
                {
                    model: Spreadsheet,
                },
            }).catch(e => console.log("Incorrect id."));
            
            if(foundUser !== null && foundUser !== undefined)
            {
                res.send(foundUser.Spreadsheets);
            }
            else
            {
                res.status(404).send("Incorrect user.");
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