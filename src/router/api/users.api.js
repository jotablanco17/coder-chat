import { Router } from "express";
import users from "../../data/fs/UsersManager.js";
import isPassword from "../../middlewares/isPass.mid.js";
const usersRouter = Router()
export default usersRouter

//read all
usersRouter.get("/", async (req, res, next)=> {
    try {
        const { role } = req.query
        let all = await  users.read(role)
        if (all) {
            return res.status(200).json({
                response : all,
                role
            }, null, 2)
        }else{
            const error = new Error ('error no se encontraron')
            error.status = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return next(error)
    }
})



//readOne
usersRouter.get("/:uid",async (req, res, next)=>{
    try {
         const { uid } = req.params
         const one = await users.readOne(uid)

         if (one) {
               return res.status(200).json({
            response : one,
            success : true
        })
         }else{
            const error = new Error('dont find id :  ERROR')
            error.status = 404
            throw error
         }
      
    } catch (error) {
        console.log(error);
        return next(error)
    }
})

//post
const create = async (req, res, next) => {
    try {
      const data = req.body;
      const one = await users.create(data);
      return res.json({
        statusCode: 201,
        message: "CREATED ID: " + one.id,
      });
    } catch (error) {
      return next(error)
    }
  };
usersRouter.post("/",isPassword, create);


//put
const update = async (req, res, next) => {
  try {
    const { uid } = req.params
    const data = req.body
    const one = await users.update(uid,data)
    return res.json({
      statusCode: 200,
      response: one
    })
  } catch (error) {
    return next(error)
  }
};
usersRouter.put("/:uid", update);



//delete
const destroy = async(req,res, next)=>{
    try {
      const { uid } = req.params
      const one = await users.destroyId(uid)
      if (!one) {
        const error = new Error('not found')
        throw error
      }else{
        return res.json({
        statusCode: 200,
        response: one
      })
      }
      
    } catch (error) {
      return next(error)
    }
  }
usersRouter.delete("/:uid", destroy)
