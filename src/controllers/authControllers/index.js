import passport from 'passport'

// para API sin usar el "successRedirect" ni el "failureRedirect"
const registerController = function(req, res, next) {
    passport.authenticate('registro', function(err, user, info) {
      try {
        if (err) return console.log(err);
        if (!user) {
        // El registro ha fallado, muestra un mensaje de error
        throw info
      }
      // El registro ha sido correcto, guarda al usuario en la sesión y redirige a la página principal
      req.logIn(user, function(err) {
        if (err) return console.log(err);
        const {username, admin} = user
        return res.status(200)
                  .send({
                    status: "ok", 
                    info: "logeado ve a /api/v1/home", 
                    data: { username: username, admin: admin }
                  })
      });
      } catch (error) {
        res.status(400).send({status: "failed", data: {error: error.msg, info: error.data}})
      }
    })(req, res, next);
  };

// para API sin usar el "successRedirect" ni el "failureRedirect"

const loginController = async function(req,res) {
  passport.authenticate('login', async function(err, user, info) {
    try {
      if (!user) {
        // El inicio de sesión ha fallado, muestra un mensaje de error
        throw info
      }
      // El inicio de sesión ha sido correcto, guarda al usuario en la sesión y redirige a la página principal
      req.logIn(user, function(err) {
        if (err) return console.log(err);
        // const {username, admin} = user
        // return res.status(200)
        //           .send({
        //             status: "ok", 
        //             info: "logeado ve a /api/v1/home", 
        //             data: { username: username, admin: admin }
        //           })
        return "logeadooooo"
      });
    } catch (error) {
      // res.status(400).send({status: "failed", data: {error: error.msg, info: error.data}})
      console.log("no logeadooo", error);
    }
  })(req,res);
}


function getLoginController(req,res){
    res.send({"status":"ok", "data":"estás en LOGIN, por lo tanto no tienes una sesion iniciada"})
}

function getRegisterController(req,res){
    res.send({"status":"ok", "data":"estás en REGISTER"})
}

function logoutController(req,res){
    if(req.isAuthenticated()){
        const username = req.user.username
        req.logout((err)=>{
            res.status(200).send({status: "ok", data: `Adiós ${username}`})
        })
    }else{
        res.send({status: "failed", data: `Todavía no inicias sesión`})
    }
}

export {
    registerController,
    loginController,
    getLoginController,
    getRegisterController,
    logoutController,
}