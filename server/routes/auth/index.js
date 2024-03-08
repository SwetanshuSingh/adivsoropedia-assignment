const dotenv = require("dotenv")
const express = require("express");
const { userSignUpSchema, userSignInSchema } = require("../../schema");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;
    try {

        const result = userSignUpSchema.safeParse(req.body);
        if(!result.success){
            return res.status(403).json({
                message : "Invalid Form Details"
            })
        }

        const isExistingUser = await prisma.user.findFirst({
            where : {
                email : email,
                username : username
            }
        });

        if(isExistingUser !== null){
            return res.status(403).json({
                message : "User already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data : {
                username : username,
                email : email,
                password : hashedPassword
            }
        });

        const token = jwt.sign({
            username : username,
            email : email
        }, JWT_SECRET);

        return res.status(200).json({
            message : "User created Successfully",
            token : token
        })
        
    } catch (error) {
        res.status(500).json({
            error : "Internal Server Error"
        });
    }
});


router.post("/signin", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        
        const result = userSignUpSchema.safeParse(req.body);
        if(!result.success){
            return res.status(403).json({
                message : "Invalid Form Details"
            })
        }

        const isExistingUser = await prisma.user.findFirst({
            where : {
                username : username,
                email : email
            }
        });

        if(isExistingUser === null){
            return res.status(403).json({
                message : "User does not Exist"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, isExistingUser.password);

        if(isPasswordValid !== true){
            return res.status(403).json({
                message : "Invaild Password"
            })
        }
        
        const token = jwt.sign({
            username : username,
            email : email
        }, JWT_SECRET);

        return res.status(200).json({
            message : "Successfully Signed In",
            token : token
        })

    } catch (error) {
        res.status(500).json({
            error : "Internal Server Error"
        });
    }
});

module.exports = router;