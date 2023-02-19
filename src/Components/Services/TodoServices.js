import webApi from "./webApi/webApi";
import axios from "axios";

export const todoPost = async (todo, onSuccess, onFailure) => {
  try {
    const response = await axios.post(`${webApi}/posts/insertTodo`, {
      content: todo,
    });

    console.log(response);
    if (response.status === 201) {
      onSuccess(response);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error.response);
  }
};

export const getTodo = async (onSuccess, onFailure) => {
  try {
    const response = await axios.post(`${webApi}/posts/getTodo`, {});

    if (response.status === 201) {
      const r = response.data;
      let data = [];
      r.map((r, i) => {
        data.push({
          id: i + 1,
          content: r.content,
          todo_id: r.todo_id,
          action: [
            {
              label: "edit",
              action: true,
            },
            {
              label: "delete",
              action: true,
            },
          ],
        });
      });
      onSuccess(data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error.response);
  }
};

export const updateTodo = async (todo, id, onSuccess, onFailure) => {
  console.log(todo, id,"222");
  try {
    const response = await axios.post(`${webApi}/posts/updateTodo`, {
      todoId: id,
      content: todo,
    });

    console.log(response);
    if (response.status === 201) {
      onSuccess(response);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error.response);
  }
};

export const deleteTodo = async (id, onSuccess, onFailure) => {
  try {
    const response = await axios.post(`${webApi}/posts/deleteTodo`, {
      todoId: id,
    });

    console.log(response);
    if (response.status === 201) {
      onSuccess(response);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error.response);
  }
};
