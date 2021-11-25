import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authentication Error" };

//비동기로 사용할 수 있는 콜백함수, Express에서 사용하는 middleware 
export const isAuth = async (req, res, next)=>{
    //header 안에 Authorization key 의 valuse를 가져옴
    const authHeader = req.get('Authorization');
    //authHeader가 없거나, Bearer로 시작하지 않으면 auth error 처리
    if(!(authHeader && authHeader.startsWith('Bearer'))){
        return res.status(401).json(AUTH_ERROR);
    }

    //Authorization header에서 token만 가져옴
    const token = authHeader.split(' ')[1]; //공백으로 분리
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQ5YTNhMTJmY2UyMGUwMjc2YjIwNyIsImlhdCI6MTYzNzc1MzA1MywiZXhwIjoxNjM3OTI1ODUzfQ.HfBdOt2CqM_NRFzy2FwgS4ExTNg6qTLAP65xO2EPyKc'; //공백으로 분리

    //token이 유효한지 검증
    jwt.verify(token, 'myblog-secret-key', async (error, decoded)=>{
        if(error){
            return res.status(401).json(AUTH_ERROR);
        }
        const user = await userRepository.findById(decoded.id); //존재하는 user인지 확인
        if(!user){
            return res.status(401).json(AUTH_ERROR);
        }
        //token이 있을때만 req 자체에 userid를 추가해줌. 
        //앞으로 이어질 콜백합수에서 동일하게 접근해야하는 데이터라면 이렇게 등록해줄 수 있음\
        //이렇게하면 req에는 username, token, userId가 존재
        req.userId = user.id;
        next();
    })
}