import { getDatabase, ref, push, set, child, get, remove, update } from 'firebase/database';

export const addTodo = async (newTask) => {
  try {
    if (newTask.trim() !== '') {
      const db = getDatabase();
      const todoRootRef = ref(db, 'Todo');
      const todoRef = child(todoRootRef, 'todos');
      const newTodoRef = push(todoRef);
      const newTodoId = newTodoRef.key;

      const currentDate = new Date();
      const newTodo = {
        key: newTodoId,
        title: newTask,
        status: 'In Progress',
        date: `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`,
      };
      await set(newTodoRef, newTodo);

    }
  } catch (error) {
    console.error('Error adding task', error.message);
  }
};

export const deleteTodo = async (task) => {
  try {
    const db = getDatabase();
    const todoRootRef = ref(db, 'Todo');
    const todoRef = child(todoRootRef, `todos/${task.key}`);

    const todosSnapshot = await get(child(todoRootRef, 'todos'));
    if (todosSnapshot.exists()) {
      await remove(todoRef);
    }
  } catch (error) {
    console.error('Error deleting task', error.message);
  }
};

export const updateTodoStatus = async (todo) => {
  try {
    const db = getDatabase();
    const todoRef = ref(db, `Todo/todos/${todo.key}`);

    const updates = {
      status: todo.status,
    };
    await update(todoRef, updates);
  } catch (error) {
    console.error('Error updating task', error.message);
  }
};