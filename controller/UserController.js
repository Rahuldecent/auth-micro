import prisma from "../config/db.config.js"

class UserController{
    static async getUser(req,res) {
       let {id} = req.params 
       const user = await prisma.user.findUnique({
        where:{
            id:id
        },
        select:{
            id:true,
            name:true,
            email:true
        }
       })
       if(user) {
        return res.status(200).send({status:true,message:"User fetched succesfully",User:user})
       }
       return res.status(401).send({ status: false, Message: "Invalid Credantials" })
    }

    static async getUsers(req, res) {
        const { userIds } = req.body;
        const users = await prisma.user.findMany({
          where: {
            id: {
              in: userIds,
            },
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });
    
        return res.json({ users: users });
      }
}
export default UserController;