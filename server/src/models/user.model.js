import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    bio:{
        type: String,
        default: ""
    },
    profilePic:{
        type: String,
        default: ""
    },
    nativeLanguage:{
        type: String,
        default: ""
    },
    learningLanguage:{
        type: String,
        default: ""
    },
    isOnBoarded:{
        type: Boolean,
        default:false
    },
    friends:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps:true})

userSchema.pre("save",async function (next){
    if (!this.isModified('password')) return next(); // only hash if password is new/modified

    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword

    next()
})

userSchema.methods.checkPassword = async function (pass){
    const isPasswordCorrect = await bcrypt.compare(pass, this.password)
    return isPasswordCorrect
}

const User = model("User", userSchema)

export {User}