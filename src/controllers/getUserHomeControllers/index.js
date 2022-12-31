const getUserHome = async(req,res) => {
    try {
        // res.render('userHome', { name: req.user.username}) 
        return res.status(200).send({status:"ok", data: `Hola ${req.user.username} estás en 'USER | Home'`})
    } catch (error) {
        console.log(error);
    }
}

export {
    getUserHome
}