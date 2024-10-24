import { generateJwtToken } from "../lib/utils.js"
import { User } from "../models/user.js"
import bcrypt from "bcryptjs"

const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body

        if (!name || !email || !password) {
            res.status(400)
            throw new Error("Please add all fields")
        }

        const oldUser = await User.findOne({ email })

        if (oldUser) return res.status(409).send("User Already Exist. Please Login")

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            hashedPassword: hashedPassword,
        })
        const token = generateJwtToken(user._id)

        res.cookie("token", token, {
            path: "/", // Cookie is accessible from all paths
            expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
            secure: true, // Cookie will only be sent over HTTPS
            httpOnly: true, // Cookie cannot be accessed via client-side scripts
            sameSite: "None",
        })

        res.redirect("/")
    } catch (error) {
        console.log(error)
    }

}

const loginUser = async (req,res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body

    if (!email, !password) {
        res.status(400)
        throw new Error("Please add all the fields")
    }
    const user = await User.findOne({ email })

    if (!(user && bcrypt.compare(password, user.hashedPassword))) {
        return res.status(404).json({ message: "Invalid credentials" })
    }

    const token = generateJwtToken(user._id)
    res.cookie("access_token", token, {
        domain: process.env.frontend_url,
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true,
        httpOnly: true,
        sameSite: "None",
    })
    res.redirect("/")
  } catch (error) {
     console.log(error)
  }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("access_token")
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Logout failed" })
    }
}

export { registerUser, loginUser, logoutUser }