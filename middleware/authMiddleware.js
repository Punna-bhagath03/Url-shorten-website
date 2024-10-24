import jwt from "jsonwebtoken"

export const checkAuth = async (req, res, next) => {
    const token = req.cookies.access_token
    console.log(token)
    if (!token) return res.status(403).redirect("/login")

    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
        if (error) return res.status(403).json({message: error})

            if (data) {
                req.user = data
                return next()
            } else {
                console.warn(`No user data found in token.`)
                return res.status(403).json({ message: "Unauthorized access." })
            }
    })
}