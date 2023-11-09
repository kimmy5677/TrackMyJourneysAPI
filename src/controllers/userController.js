const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const userPool = require("../../db")
const userQueries = require("../dbqueries/userQueries")

const getUsers = asyncHandler( async(req, res) => {
    userPool.query( userQueries.getAllUsers, (error,results) =>
    {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
})

const newUser = asyncHandler( async (req, res) => {
    const {firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !password)
    {
        res.status(400)
        res.send({
            error:'Fill all fields'
        })
    }
    else
    {
        const salt = await bcrypt.genSalt(15)
        const hashPw = await bcrypt.hash(password, salt)
    
        userPool.query( userQueries.emailCheck, [email], (error,results) =>
        {
            if (error) throw error;
    
            if (results.rows[0].case)
            {
                res.status(400)
                res.send({
                    error:'Account exists'
                })
            }
            else
            {
                userPool.query( userQueries.addNewUser,[firstname, lastname, email, hashPw,new Date()], (error,results) =>
                {
                    if (error) throw error;
                    res.status(200).send('Sign up successful')
                })
            }
    
        })
    }
})

const loginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body
    userPool.query( userQueries.getUserFromLogin,[email], async (error,results) =>
    {
        if (error) throw error;
        if (results.rows[0])
        {
            if (await bcrypt.compare(password, results.rows[0].password_hash))
            {
                res.status(200).json({
                    id:results.rows[0].id,
                    firstname: results.rows[0].firstname,
                    lastname: results.rows[0].lastname,
                    email_address: results.rows[0].email_address,
                    access_token: generateJWTToken(results.rows[0].id)
                })
            }
            else
            {
                res.status(400).json({
                    error: 'Credentials invalid'
                }) 
            }
        }
        else
        {
            res.status(400).json({
                error: 'User not found'
            })
        }

    })

})

const getUser = asyncHandler( async(req, res) => {
    res.send("get USerrrrrr")
})

const generateJWTToken = (userid) =>
{
    return jwt.sign({userid}, process.env.JWT_SECRET,{
        expiresIn:'10d'
    })
}

module.exports = { getUsers, newUser, getUser, loginUser };