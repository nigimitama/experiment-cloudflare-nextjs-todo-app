"use server";

import { getDB } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    created_at: string;
}

export async function getTodos() {
    const db = await getDB();
    const { results } = await db.prepare("SELECT * FROM todos ORDER BY created_at DESC").all<Todo>();
    return results;
}

export async function addTodo(title: string) {
    if (!title.trim()) return;
    const db = await getDB();
    await db.prepare("INSERT INTO todos (title) VALUES (?)").bind(title).run();
    revalidatePath("/");
}

export async function toggleTodo(id: number, completed: boolean) {
    const db = await getDB();
    await db.prepare("UPDATE todos SET completed = ? WHERE id = ?").bind(completed ? 1 : 0, id).run();
    revalidatePath("/");
}

export async function deleteTodo(id: number) {
    const db = await getDB();
    await db.prepare("DELETE FROM todos WHERE id = ?").bind(id).run();
    revalidatePath("/");
}
