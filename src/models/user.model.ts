import {Schema, model} from 'mongoose';

const userSchema = new Schema({

    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    rol_id: {type: Schema.Types.ObjectId, ref: 'roles'},
    access_token: {type: String},
    status: {type: Boolean},


})

const userModel = model('users', userSchema);

export default userModel;
