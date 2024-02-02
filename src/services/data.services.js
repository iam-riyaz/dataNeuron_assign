import { Data } from "../models/data.model.js";

export const getData = async () => {
  const result = await Data.find({});
  return result;
};

export const postData = async (text) => {
  const createdData = await new Data({ text });
  createdData.save();
  const alldata = await Data.find({});
  return alldata;
};

export const updateData = async (id, text) => {
  const data = await Data.findById(id);

  data.text = text;
  data.save();

  const alldata = await Data.find({});
  return alldata;
};
