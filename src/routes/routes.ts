import express from "express";
import { createUser, getUsers } from "../controllers/User.controller";

const router= express.Router();

router.get('/',(req,res)=>{
    res.send("Welcome to my API");
});
router.post('/create', createUser);
router.get('/getUsers',getUsers);

export default router

