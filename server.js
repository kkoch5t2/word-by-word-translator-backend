const express = require("express");
const app = express();
const translationRoute = require("./routes/translation");
const PORT = 5000;

// ミドルウェア
app.use(express.json());
app.use("/api/translation", translationRoute);

app.listen(PORT, () => console.log("サーバーが起動しました"));
