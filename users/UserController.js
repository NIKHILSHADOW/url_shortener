import { v4 as uuidv4 } from "uuid";
import { User } from "./UserEntity.js";

let loginSessions = [];

function findInLoginSession(val) {
    console.log(loginSessions)
    return loginSessions.find(session => session === val);
}

async function handleLogin(req, res) {

    if(req.headers && req.headers.cookie) {
        let cookies = {};

        const cookiesArray = req.headers.cookie.split(';');

        cookiesArray.forEach((cookie) => {
            const [key, value] = cookie.trim().split('=');
            cookies[key] = value;
        });

        const rr = findInLoginSession(cookies['op'])

        // console.log(rr);

        if(rr){
            req.cookies = cookies;
            return res.render("home")
        }
    }

    const { email , password } = req.body;

    const obj = await User.findOne({email:email, password:password});

    if(!obj) {
        return res.redirect("login")
    }

    const id = uuidv4();

    res.cookie('op', id)

    loginSessions.push(id)

    res.render("home")
}


async function handleSignup(req, res) {

    const { firstname, lastname, email, password, confirm_password } = req.body;

    if(password !== confirm_password) {
        res.redirect("/error")
    }

    const obj = await User.create({
        firstname,
        lastname,
        email,
        password
    })

    res.redirect("login")
    
}


function handleLogout(req, res) {
    res.clearCookie('op')
    return res.redirect("login")
}

export { findInLoginSession, handleLogin, handleLogout, handleSignup };

