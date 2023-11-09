const getAllUsers = "SELECT * FROM users"
const emailCheck = 
`SELECT 
CASE WHEN EXISTS 
(
    SELECT * FROM users WHERE email_address= $1
)
THEN true
ELSE false
END`
const addNewUser = "INSERT INTO users (firstname, lastname, email_address, password_hash, created) values ($1, $2, $3, $4, $5)"
const getUserFromLogin = "SELECT * FROM users WHERE email_address=$1"

module.exports = {
    getAllUsers, emailCheck, addNewUser, getUserFromLogin
}