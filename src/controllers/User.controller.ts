import User from "../models/User.model";
import express, { Request, Response } from 'express';
import { Iuser } from "../types/user";
import { signupValidator } from "../utils/validation";

export const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, name, password } = req.body;
    try {
        const { error } = signupValidator(req.body);
        if (error) return res.status(400).json({ error: error});
        const newUser = new User({ email, name, password });
        await newUser.save();
        res.status(201).json({ newUser: newUser });
    } catch (error) {
        res.status(400).json({ error });
    }

}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({ users: users });
    }
    catch (error) {
        res.status(400).json(error);
    }
}
