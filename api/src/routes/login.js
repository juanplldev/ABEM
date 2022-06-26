// Dependencies
const {Router} = require("express");
const router = Router();
const {Op} = require("sequelize");
// Files
const {User} = require("../db");
const {compare} = require("../controllers/bcrypt");
const {signToken} = require("../controllers/tokens");


router.post("/login", async (req, res) => {
    const {user, password} = req.body;
    
    try
    {
        if(user && password)
        {
            const foundUser = await User.findAll({
                where:
                {
                    // Para iniciar sesion con usuario o mail
                    [Op.or]:
                    [
                        {dni: user},
                        {email: user},
                        {name: user},
                    ],
                },
            });
            
            if(foundUser.length)
            {
                const foundPassword = foundUser[0].dataValues.password;
                const checkPassword = await compare(password, foundPassword);
                const token = await signToken(foundUser[0].dataValues);
                
                if(checkPassword)
                {
                    res.send({foundUser, token});
                    // res.send("Loged");
                }
                else
                {
                    res.status(404).send("Incorrect user or password.");
                };
            }
            else
            {
                res.status(404).send("Incorrect user or password.");
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