// ข้อมูลผู้ใช้สำหรับล็อกอิน //(เก็บ seedUsers)
export const seedUsers = [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" }
];

// ข้อมูล ToDo List (ถ้าไม่ได้ทำโจทย์ Challenge เซฟลง JSON ก็เก็บเป็น Array แบบนี้)
export let todoItems: string[] = ["Task 1", "Task 2"];