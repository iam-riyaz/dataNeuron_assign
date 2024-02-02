import { Data } from "../models/data.model.js";
import * as dataService from "../services/data.services.js";

export const getData = async (req, res) => {
  try {
    const data = await dataService.getData();

    res.status(200).send({ data });
  } catch {
    res.status(400).send("error occurred");
  }
};

export const postData = async (req, res) => {
  try {

    const {text}= req.body
        console.log(text)
    const data= await dataService.postData(text)
    res.status(200).send({ data });
  } catch {
    res.status(400).send("error occurred");
  }
};

export const updateData= async (req, res) => {
    try{
        const {id,text}= req.body

        const data= await dataService.updateData(id,text)

        res.status(200).send({ data });
    }
    catch{
        res.status(400).send("error occurred");
    }
}
