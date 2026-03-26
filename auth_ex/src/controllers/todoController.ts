import { Request, Response } from "express";
import { todoItems } from "../data/seed"; // ดึง array ข้อมูล ToDo มาใช้

// ฟังก์ชันเปิดหน้าโชว์ ToDo
export const getTodos = (req: Request, res: Response) => {
    res.render("list", { 
        listTitle: "Today", 
        items: todoItems, 
        username: req.session.username 
    });
};

// ฟังก์ชันเพิ่ม ToDo
export const addTodo = (req: Request, res: Response) => {
    const name = (req.body.newItem ?? "").toString().trim();
    if (name) todoItems.push(name);
    res.redirect("/todos");
};

// ฟังก์ชันลบ ToDo
export const deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.body.checkbox);
    if (!Number.isNaN(id)) todoItems.splice(id, 1);
    res.redirect("/todos");
};