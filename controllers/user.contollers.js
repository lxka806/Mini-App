const path = require("path")

const readFile = require("../utils/readfile")
const writefile = require("../utils/writefile")
const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcrypt")

const DB_PATH = path.join(__dirname, "../data/users.json")

const createaccount = async (req, res) => {
    
    try{
        const { userName, userEmail, password} = req.body

    // check if name or email or password is empty

    if(!userName || !userEmail || !password){
        return res.status(400).json({ message: "Please fill in the fields"})
    }

    // read the data from file
    const data = await readFile(DB_PATH)
    
    // check if email is already used
    const email = data.find(e => e.userEmail === userEmail)

    if(email){
        return res.status(400).json({ message: "Email already used please use different Email or Log in" })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // new account
    const newaccount = {
        id: uuidv4(),
        userName,
        userEmail,
        password: hashedPassword
    }

    // if everything was okay

    data.push(newaccount);
    await writefile(DB_PATH, data);

    res.status(201).json(newaccount);
    }catch(e){
        res.status(500).json({ message: e.message })
        console.log(e)
    }
}


const login = async (req, res) => {
    try{
        const { userEmail, password } = req.body

        // check if fields are empty
        if(!userEmail || !password){
            return res.status(400).json({ message: "Please fill in the fields"})
        }

        // read users
        const data = await readFile(DB_PATH)

        // find user
        const user = data.find(u => u.userEmail === userEmail)

        if(!user){
            return res.status(404).json({ message: "User not found" })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ message: "Wrong password" })
        }

        // success
        res.status(200).json({
            message: "Login successful",
            user
        })

    }catch(e){
        res.status(500).json({ message: e.message })
        console.log(e)
    }
}

module.exports = {
    createaccount,
    login
}