import {Schema, model} from 'mongoose';

const rolSchema = new Schema({

    name: {type: String, unique: true, required: true},
    level: {type: Number, required: true}


})



const rolModel = model('roles', rolSchema);

export default rolModel;