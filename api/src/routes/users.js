// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");
const {API_KEY} = process.env;


router.get("/users", async(req, res) => {
    const {apiKey} = req.query;
    
    if(apiKey === API_KEY)
    {
        try
        {
            const userNames = await User.findAll({
                attributes: ["name"],
            });
            const userEmails = await User.findAll({
                attributes: ["email"],
            });
            const userDnis = await User.findAll({
                attributes: ["dni"],
            });
            
            const users = userNames.concat(userEmails, userDnis);
            
            res.send(users);
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


module.exports = router;