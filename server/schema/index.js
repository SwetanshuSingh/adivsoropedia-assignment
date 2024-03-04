const zod = require("zod");

const userSignUpSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  email: zod.email(),
});

module.exports = userSignUpSchema;