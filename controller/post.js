import express from "express";
import * as postRepository from '../data/post.js'

export async function createPost(req, res, next){
    const {title, content} = req.body;
    const post = await postRepository.create(title, content, req.userId); //userid:가상아이디
    res.status(201).json(post);
}