import express from "express";
import * as commentRepository from "../data/comment.js";

export async function getComment(req, res, next){
    const postId = req.params.postId;
    const comments = await commentRepository.getByPostId(postId);

    return res.status(200).json(comments);
}

export async function createComment(req, res, next){
    const postId = req.params.postId;
    const userId = req.userId;
    const text = req.body.text;
    const comment = await commentRepository.create(postId, userId, text);

    console.log(comment);
    return res.status(201).json(comment);
}