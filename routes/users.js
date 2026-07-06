const express = require("express");
// הגדרת משתנה עם יכולות ראוטר
const router = express.Router();

// הגדרת ראוטר
// הפרמטר הראשון הכתובת ביחס למה שיוגדר בראוט
// הפרמטר השני פונקציה של שרת איך להגיב
router.get("/",async(req,res) => {
  res.json({msg:"users work"})
})

module.exports = router;