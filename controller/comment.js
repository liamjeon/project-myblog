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

export async function updateComment(req, res, next){
    const id = req.params.id;
    const {text} = req.body;
    const comment = await commentRepository.getById(id);

    if(!comment){
        return res.status(404);
    }
    if(comment.userId !== req.userId){
        return res.sendStatus(403); //로그인했지만 권한 없음
    }

    const updated = await commentRepository.update(id, text);
    res.status(200).json(updated);
}

export async function deleteComment(req, res, next){
    const id = req.params.id;
    await commentRepository.remove(id);
    res.sendStatus(204);
}