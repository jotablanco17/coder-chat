function isPassword(req, res, next) {
    try {
        const { password, email} = req.body
        if(!password || !email){
            const err = new Error('insert email or password')
            err.statusCode = 404
            throw err
        }else{
            return next()
            // el next solo me deja pasar hacia la funcion siguiente
        }
    } catch (error) {
        return next(error)
        //el next error me deja pasar al errorHandler
    }
}
export default isPassword