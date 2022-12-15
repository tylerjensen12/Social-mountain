require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env
//Destructuring Secret from .env file

module.exports = {
    //To be able to export these different functions to other files
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            //checking for the headerToken and if its not there. There's a problem.
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
            //Comparing the jwt of the headerToken to the SECRET.
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
        //Go to the next function
    }
}