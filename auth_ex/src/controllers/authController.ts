import { Request, Response } from "express";
import { seedUsers } from "../data/seed"; // ดึงข้อมูลจำลองมาใช้

// ฟังก์ชันตอนกดปุ่ม Login
export const loginPost = (req: Request, res: Response) => {
    const username = (req.body.username ?? "").toString().trim();
    const password = (req.body.password ?? "").toString();
    
    const user = seedUsers.find(u => u.username === username && u.password === password);
    
    if (!user) return res.redirect("/?q=invalid");

    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect("/todos");
};

// ฟังก์ชันตอนกดปุ่ม Logout
export const logoutPost = (req: Request, res: Response) => {
    req.session.destroy(() => res.redirect("/"));
};