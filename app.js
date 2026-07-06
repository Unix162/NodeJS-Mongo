// ספריית אקספרס להפעלת שרת בקלות
const express = require("express");
// ספרייה למינפולציה על כתובות סטרינג
const path = require("path");
// ספרייה להפעלת שרת
const http = require("http");
// פונקציה שתגדיר לנו את הראוטים
const {configRoutes} = require("./routes/configRoutes")
// התחברות למסד
require("./db/mongoConnect")


// משתנה אפ מקבל את היכולות של אקספרס ויכול להוסיף לו 
// יכולות ופקודות חדשות
const app = express()

// כדי שהאפליקציה תוכל לקבל באדי מצד לקוח
app.use(express.json());

// הגדרת תקיית פאבליק כתקייה ציבורית שהשרת מכיר את כל
// הקבצים בתוכה ויודע לקרוא אותם
app.use(express.static(path.join(__dirname,"public")))
// הגדרת כל הראוטים של האפליקציה
configRoutes(app);

// הגדרת שרת שמקבל יכולות של אקספרס
const server = http.createServer(app);

server.listen(3001);
console.log("http://localhost:3001")