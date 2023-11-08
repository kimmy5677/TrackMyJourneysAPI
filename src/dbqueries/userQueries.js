const getAllUsers = "SELECT * FROM USERS"
const emailCheck = 
`SELECT 
CASE WHEN EXISTS 
(
    SELECT * FROM users where EMAIL_ADDRESS= $1
)
THEN true
ELSE false
END`

module.exports = {
    getAllUsers, emailCheck
}