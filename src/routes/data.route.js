import express from 'express';
import * as dataController from "../controllers/data.controller.js";


export const dataRoute= express.Router()

dataRoute.get("/get", dataController.getData)

dataRoute.post('/post',dataController.postData)

dataRoute.patch("/update", dataController.updateData)