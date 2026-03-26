import { Request, Response, NextFunction } from "express";

export function requireLogin(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId) {
        return res.redirect("/?q=need-login"); // ถ้าไม่มี Session ให้เตะไปหน้าแรก [cite: 511]
    }
    next();
}

//เมื่อืำ challenge
/*import express, { Request, Response } from "express";
import session from "express-session";
import { requireLogin } from "./middleware/requireLogin";
// Import Controllers ที่เราเพิ่งสร้างมาใช้งาน
import { loginPost, logoutPost } from "./controllers/authController";
import { getTodos, addTodo, deleteTodo } from "./controllers/todoController";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(session({
    secret: "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 1000 }
}));

// --- Routes ที่บางเฉียบ (เรียกใช้ Controller แทนการเขียนโค้ดยาวๆ) ---
app.get("/", (req: Request, res: Response) => res.render("index")); // หน้าแรก
app.post("/login", loginPost);
app.post("/logout", requireLogin, logoutPost);

app.get("/todos", requireLogin, getTodos);
app.post("/add", requireLogin, addTodo);
app.post("/delete", requireLogin, deleteTodo);
// -----------------------------------------------------------------

app.listen(3000, () => {
    console.log("Server running on port 3000");
});*/