const getAdminHome = async (req,res)=>{
    return res.status(200).send({status:"ok", data: `Hola ${req.user.username} estás en 'ADMIN | Home'`})
}

const processInfo = async (req,res)=>{
    return res.send({
        info: "desde infoooo",
        argDeEntrada: process.argv,
        sistema: process.env.OS,
        nodeVersion: process.version,
        memoriaReservada: process.memoryUsage().rss,
        pathEjecucion: process.execPath,
        procesoId: process.pid,
        carpetaDelProyecto: process.cwd(),
    })
}

export {
    getAdminHome,
    processInfo,
}