const config = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://0.0.0.0:27017/e-commerce",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "JWTSECRETKEY981276345",
};
export default config;
