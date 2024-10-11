import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/User.controller";

const router= express.Router();

router.get('/',(req,res)=>{
    res.send("Welcome to my API");
});
router.post('/create', createUser);
router.get('/getUsers',getUsers);
router.get('/getUser/:id',getUserById);
router.patch('/updateUser/:id',updateUser);
router.delete('/deleteUser/:id',deleteUser);

export default router

