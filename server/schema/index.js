const zod = require("zod");

const userSignUpSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  email: zod.string().email(),
});

const userSignInSchema = zod.object({
  username : zod.string(),
  password : zod.string()
})

module.exports = { userSignUpSchema, userSignInSchema };