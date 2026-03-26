import express, { Request, Response } from "express";
import session from "express-session";
// นำเข้าข้อมูลและฟังก์ชันจากไฟล์อื่นที่เราแยกไว้
import { requireLogin } from "./middleware/requireLogin"; 
import { seedUsers, todoItems } from "./data/seed"; 

const app = express();
app.use(express.urlencoded({ extended: true })); // [cite: 466]
app.set("view engine", "ejs"); // [cite: 466]

// ตั้งค่า Session 
app.use(session({
    secret: "replace-with-a-strong-secret", 
    resave: false, 
    saveUninitialized: false, 
    cookie: { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 1000 } // [cite: 485]
}));

// Route ต่างๆ
app.get("/", (req: Request, res: Response) => {
    res.render("index"); 
});

app.post("/login", (req: Request, res: Response) => {
    const username = (req.body.username ?? "").toString().trim(); // [cite: 497]
    const password = (req.body.password ?? "").toString(); // [cite: 497]
    
    const user = seedUsers.find(u => u.username === username && u.password === password); // [cite: 498, 499]
    
    if (!user) return res.redirect("/?q=invalid"); // [cite: 501]

    req.session.userId = user.id; // [cite: 502]
    req.session.username = user.username; // [cite: 503, 505]
    res.redirect("/todos"); // [cite: 504]
});

app.get("/todos", requireLogin, (req: Request, res: Response) => { // [cite: 514]
    res.render("list", { listTitle: "Today", items: todoItems, username: req.session.username }); // [cite: 517, 520, 521, 522]
});

app.post("/add", requireLogin, (req: Request, res: Response) => { // [cite: 513]
    const name = (req.body.newItem ?? "").toString().trim(); // [cite: 528]
    if (name) todoItems.push(name);
    res.redirect("/todos"); // [cite: 530]
});

app.post("/delete", requireLogin, (req: Request, res: Response) => { // [cite: 513]
    const id = Number(req.body.checkbox); // [cite: 536]
    if (!Number.isNaN(id)) todoItems.splice(id, 1);
    res.redirect("/todos"); // [cite: 536]
});

app.post("/logout", requireLogin, (req: Request, res: Response) => { // [cite: 513]
    req.session.destroy(() => res.redirect("/")); // [cite: 540]
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});