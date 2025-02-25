import mongoose from 'mongoose';

export const connection = async()=>{
    await mongoose.connect(`${process.env.MongoDB_URL}`).then( ()=>{
        console.log('Connnected to DB');
    });
};