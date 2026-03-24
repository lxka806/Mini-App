const path = require("path")

const readFile = require("../utils/readfile")
const writefile = require("../utils/writefile")
const { v4: uuidv4 } = require("uuid")

const DB_PATH = path.join(__dirname, "../data/users.json")

const createaccount = async (req, res) => {
    
    try{
        const { userName, userEmail, password} = req.body

    // check if name or email or password is empty

    if(!userName.length || !userEmail.length || !password.length){
        return res.status(500).json({ message: "Please fill in the fields"})
    }

    // read the data from file
    const data = await readFile(DB_PATH)
    
    // check if email is already used
    const email = data.find(e => e.userEmail === userEmail)

    if(email){
        return res.status(500).json({ message: "Email already used please use different Email or Log in" })
    }


    // new account
    const newaccount = {
        id: uuidv4(),
        userName,
        userEmail,
        password
    }

    // if everything was okay

    data.push(newaccount);
    await writefile(DB_PATH, data);

    res.status(201).json(newaccount);
    }catch(e){
        res.json({ message: e.message })
        console.log(e)
    }
}

module.exports = {
    createaccount,
}