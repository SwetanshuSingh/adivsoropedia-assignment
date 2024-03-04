const express = require("express");
const { userSignUpSchema, userSignInSchema } = require("../../schema");

const router = express.Router();

router.post("/signup", (req, res) => {
    const { username, password, email } = req.body;

    try {

        const result = userSignUpSchema.safeParse(req.body);
        if(!result.success){
            return res.status(403).json({
                message : "Invalid Form Details"
            })
        }
        
        

    } catch (error) {
        res.status(500).json({
            error : "Internal Server Error"
        });
    }
});


router.get("/signin", (req, res) => {
    const { username, password } = req.body;

    try {
        
        const result = userSignUpSchema.safeParse(req.body);
        if(!result.success){
            return res.status(403).json({
                message : "Invalid Form Details"
            })
        }

        
    } catch (error) {
        res.status(500).json({
            error : "Internal Server Error"
        });
    }
});

module.exports = router;