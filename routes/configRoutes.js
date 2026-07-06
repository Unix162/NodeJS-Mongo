// הגדרת ראוטים
const indexR = require("./index");
const usersR = require("./users");
const toysR = require("./toys");




// נייצר ונייצא פונקציה שמגדירה את כל הראוטים
exports.configRoutes = (app) => {
  // הגדרת ראוט כללי
  app.use("/",indexR)
  app.use("/users",usersR)
  app.use("/toys",toysR)


}