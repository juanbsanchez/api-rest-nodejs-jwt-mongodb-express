import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next)=>{
    try{
        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({message: "No token provided"})

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const userFound = await User.findById(req.userId, {password: 0})
        if(!userFound) return res.status(404).json({message: "no user found"});

        next();
    }catch(err){
        return res.status(401).json({message: "Unauthorized"})
    }
}

export const isModerator = async (req, res, next) =>{
    try{
        const userFound = await User.findById(req.userId);
        const rolesFound = await Role.find({_id: {$in: userFound.roles}});

        for(let i=0; i < rolesFound.length; i++){
            if(rolesFound[i].name === "moderator"){
                next();
                return;
            }
        }

        return res.status(403).json({message: "Required Moderator Role"})

    }catch(err){
        console.log(err);
    }
}

export const isAdmin = async (req, res, next) =>{
    try{
        const userFound = await User.findById(req.userId);
        const rolesFound = await Role.find({_id: {$in: userFound.roles}});

        for(let i=0; i < rolesFound.length; i++){
            if(rolesFound[i].name === "admin"){
                next();
                return;
            }
        }

        return res.status(403).json({message: "Required Admin Role"})

    }catch(err){
        console.log(err);
    }
}