import { validationResult, body } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  //username, password 같으면 error 처리
  if (req.body.username === req.body.password) {
    //validate return 형식과 맞춤
    return res.status(400).json({ message:{msg: "아이디와 비밀번호가 같습니다." }});
  }
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0] });
};

export const validateAuth = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("아이디는 3글자 이상")
    .matches(/^[a-zA-Z0-9]/, "g")
    .withMessage("영어와 숫자만 입력 가능합니다"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("비밀번호는 4글자 이상"),
  validate,
];
