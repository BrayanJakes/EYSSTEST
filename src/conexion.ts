import mongoose from 'mongoose';

const conexion = async () => {
    await mongoose.connect('mongodb+srv://Megalodon:Themeg@lodon54321@cluster0-ryw4n.mongodb.net/test?retryWrites=true&w=majority', 
            { useNewUrlParser: true,
              useUnifiedTopology: true,
                useCreateIndex: true } )
            .then(resp => console.log('DB Conectado'))
            .catch(e => console.log('error en conexion DB:', e))
}

export default conexion;