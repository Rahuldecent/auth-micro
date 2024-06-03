import bcrypt from "bcrypt";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
const secret_key = process.env.JWT_SECRET
class AuthController {
    static async register(req, res) {
        try {
            const data = req.body
            const salt = bcrypt.genSaltSync(10)
            data.password = bcrypt.hashSync(data.password, salt);

            const user = await prisma.user.create({
                data: data
            })
            return res.status(201).json({ message: "User created Successfully", data: user })
        } catch (error) {
            return res.status(500).json({ message: "Someting went wrong", error: error })
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (user) {
                if (!bcrypt.compareSync(password, user.password)) {
                    return res.status(401).send({ status: false, Message: "Invalid Credantials" })
                }

                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                const token = jwt.sign(payload, secret_key, {
                    expiresIn: "40d"
                });
                return res.status(401).send({
                    status: true, Message: "Login successfully", token: `Bearer ${token}`
                })

            }
            return res.status(401).send({ status: false, Message: "Invalid Credantials" })
        } catch (error) {
            return res.status(500).json({ message: "Someting went wrong", error: error })
        }

    }
    static async user(req,res) {
        const user = req.user;
        return res.status(200).json({user:user})
    }
}

export default AuthController;