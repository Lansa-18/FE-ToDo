import axiosApi from "./axionApi";
import type { TodoResponse } from "./types";

export async function getTodos() {
  const response = await axiosApi.get<TodoResponse>("/todos");
  const { data } = response;

  return data.userTodos;
}
