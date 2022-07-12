const user = "admin";
const pwd = "iaq-dashboard-2022";

module.exports = async function (req, res, next) {
  const auth = { login: user, password: pwd };

  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }

  res.status(401).json({ message: "Authentication required." });
};
