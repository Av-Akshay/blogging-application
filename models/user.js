const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/user-avtar.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  console.log(this);
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPassword", function (email, password) {
  console.log(this);
  const user = this.findOne({ email });
  if (!user) throw new Error("User not found");
  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHas = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
   if (hashedPassword !== userProvidedHas) throw new Error("Incorrect Password");

    return {...user, password: undefined,salt:undefined}
});
const User = mongoose.model("user", userSchema);

module.exports = User;
