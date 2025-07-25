import jwt from "jsonwebtoken"

const fetchUser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object

    const token = req.header('auth-token')
    if (!token) {
        res.status(401).json({ error: "'Access denied. No token provided.' " })
    }
    try {

        const data = jwt.verify(token, 'shhhhh')
        req.user = data.user
        next()

    } catch (error) {

        res.status(401).json({ error: 'Invalid token' });

    }

}

export default fetchUser