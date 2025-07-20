import bcrypt from "bcryptjs";

const password = "123456";
const saltRounds = 12;

bcrypt.hash(password, saltRounds).then((hash) => {
  console.log("bcrypt hash for '123456':", hash);
});
