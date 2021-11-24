import Mongoose from "mongoose";

//host 주소
const url =
  "mongodb+srv://liam:1234@cluster0.dtwor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export async function connectDB() {
  return Mongoose.connect(url);
}

//_id<database> --> id<server>로 변환
export function useVirtualId(schema) {
  //id라는 가상아이디를 추가할건데, schema의 _id(obejctID) 값을 toString변환하여 반환.
  //collection에 들어가는 것은 아님.
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  //JSON으로 변환할 때 가상요소들도 포함될 수 있도록 함.
  schema.set("toJSON", { virtuals: true });
  // schema.set("toOject", { virtuals: true }); //console.log에도 출력할 때 보고싶어서 Obejct에도 포함되도록 함
}
