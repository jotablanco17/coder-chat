function isTitle(req, res, next) {
    try {
        const { title } =  req.body
        if (!title) {
            const err = new Error('not title!')
            err.statusCode = 404
            throw err
        }else{
            return next()
        }
    } catch (error) {
      next(error)  
    }
}

export default isTitle