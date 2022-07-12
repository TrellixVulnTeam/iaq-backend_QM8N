const user = "admin";
const pwd = "iaq-dashboard-2022";

module.exports = async function (req, res, next) {
  const apiKey = req.get("API-Key");
  if (!apiKey || apiKey !== "simple-key") {
    res.status(401).json({ error: "unauthorised" });
  } else {
    next();
  }
};
