import mongoose from 'mongoose';

export const connection = async()=>{
    await mongoose.connect(`${process.env.url}`).then( ()=>{
        console.log('Connnected to DB');
    });
};