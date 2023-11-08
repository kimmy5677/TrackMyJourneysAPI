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
    
        userPool.query( userQueries.emailCheck,[email], (error,results) =>
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
                res.status(200).json(results.rows[0].case)
            }
    
        })
    }


})

const loginUser = asyncHandler( async(req, res) => {
    res.send("Login userrrrrr")
})

const getUser = asyncHandler( async(req, res) => {
    res.send("get USerrrrrr")
})

module.exports = { getUsers, newUser, getUser, loginUser };