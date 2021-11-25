import express from "express";
import * as postRepository from "../data/post.js";

export async function getAllPost(req, res, next) {
  const posts = await postRepository.getAll();

  return res.status(200).json(posts);
}

export async function getPost(req, res, next){
    const id = req.params.id;
    const post = await postRepository.getById(id);
    
    if(!post){ //id와 일치하는 post가 없다면 return 404
        return res.status(404);
    }
    // res.render("defail", post);
    return res.status(200).json(post);
}

export async function createPost(req, res, next) {
  const { title, content } = req.body;
  //req.userId : isAuth에서 req에 포함된놈
  const post = await postRepository.create(title, content, req.userId);
  console.log(post);

  return res.status(201).json(post);
}

export async function updatePost(req, res, next){
    const id = req.params.id;
    const { title, content } = req.body;
    const post = await postRepository.getById(id);

    console.log(post.userId, req.userId);

    if(!post){ //id와 일치하는 post가 없다면 return 404
        return res.status(404);
    }
    if(post.userId !== req.userId){
        return res.sendStatus(403); //로그인했지만 권한 없음
    }
    
    
    const updatedPost = await postRepository.update(id, title, content);
    res.status(200).json (updatedPost);
}

export async function deletePost(req, res, next){
    const id = req.params.id;
    const post = await postRepository.deletePost(id);
    res.status(204);
}
