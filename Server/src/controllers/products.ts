import express from 'express';
import { Tshirt, Mug, Hoodie, Sticker } from '../models/productSchema';

// Endpoint to save a Tshirt
export const Tshirts = async (req: any, res: any) => {
    try{
    const id = req.params.id;
    if(id==!null){
        const data = await Tshirt.findById(id); // Fetch data from MongoDB using Mongoose
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
          }
          if(data){
              return res.status(200).json(data);
          }
    }
   
    
      if(req.body  ==!null)
      {
        const newTshirt = new Tshirt(req.body);
         await newTshirt.save();
         return  res.status(201).send(newTshirt);
      }
        const tshirts = await Tshirt.find();
      res.status(201).send(tshirts);
        
      
    } catch (error) {
      res.status(400).send(error);
    }
  };

// Endpoint to save a Mug
export const mug=async (req:any, res:any) => {
  try {
    if(req.body  ==!null){
        const newmug = new Mug(req.body);
        await newmug.save();
       return res.status(201).send(newmug);
    }


    const mug =await Mug.find();
    res.status(201).send(mug);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Endpoint to save a Hoodie
export const hoodie= async (req:any, res:any) => {
  try {
    if(req.body  ==!null){

    const newhoodie = new Hoodie(req.body);
    await newhoodie.save();
    res.status(201).send(newhoodie);

}
    const hoodie=await Hoodie.find()
    res.status(201).send(hoodie);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Endpoint to save a Sticker
export const sticker=async (req:any, res:any) => {
  try {
    if(req.body  ==!null){
    const newsticker = new Sticker(req.body);
    await newsticker.save();
    return res.status(201).send(newsticker);

    
}
    const sticker =await Sticker.find()
    res.status(201).send(sticker);
  } catch (error) {
    res.status(400).send(error);
  }
};


