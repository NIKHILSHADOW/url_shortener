import { findInLoginSession } from "../users/UserController.js";


function authLogin(req, res, next) {

    if(req.headers && req.headers.cookie) {
        let cookies = {};

        const cookiesArray = req.headers.cookie.split(';');

        cookiesArray.forEach((cookie) => {
            const [key, value] = cookie.trim().split('=');
            cookies[key] = value;
        });

        const rr = findInLoginSession(cookies['op'])

        console.log(rr);

        if(rr){
            // req.cookies = cookies;
            next()
        }else{
            return res.redirect("/localhost:3000/api/users/login")
        }
    }else{
        return res.redirect("/localhost:3000/api/users/login")
    }
}

export {
    authLogin
};
