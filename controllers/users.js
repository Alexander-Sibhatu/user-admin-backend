const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.fields;
        const {image} = req.files;

        if(!name || !email || !phone || !password) {
            return res.status(404).json({
                message: "name, email, phone or password is missing"
            })
        }

        if (password.length < 6) {
            return res.status(404).json({
                message: 'minimum length for password is 6'
            })
        }
        if (image && image.size > 1000000) {
            return res.status(404).json({
                message: 'maximum size for image is 1Mb'
            })
        }

        const isExist = await User.findOne({email: email})
        if(isExist){
            return res.status(404).json({
                message: 'user with email already exists'
            })
        }
        res.status(200).json({message: 'user is created'})
    } catch (error) {
        res.status(500).json({
            message: message.error
        })
    }
}

module.exports = {registerUser}