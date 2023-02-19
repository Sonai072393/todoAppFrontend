import React, { useEffect, useState } from "react";

//ui
import Card from "../../Ui/Card/Card";
import { Button } from "@mui/material";
import { NoteAdd } from "@mui/icons-material";
import "../../Ui/CSS/ComponentsStyle.css";
import TableUi from "../../Ui/UI/TableUi/TableUi";

//service
import { deleteTodo, getTodo, todoPost, updateTodo } from "../../Services/TodoServices";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  Alert_Message,
  selectMsgType,
} from "../../Ui/Redux/Features/Alert/alertSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const messagesType = useSelector(selectMsgType);

  const [todo, setTodo] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(false);

  const onChange = (event) => {
    console.log(event.target.value, "rrrrr");
    setTodo(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (todo.length) {
      todoPost(
        todo,
        (res) => {
          setRefresh(!refresh);
          setTodo([]);
          dispatch(
            Alert_Message({
              msgType: messagesType.successMsg,
              msg: "Todo Added!",
            })
          );
        },
        (err) => {
          dispatch(
            Alert_Message({
              msgType: messagesType.errorMsg,
              msg: err,
            })
          );
        }
      );
    } else {
      dispatch(
        Alert_Message({
          msgType: messagesType.errorMsg,
          msg: "Please!! Add Todo",
        })
      );
    }
  };

  useEffect(() => {
    getTodo(
      (res) => {
        console.log(res, "555");
        setTodoList(res);
      },
      (err) => {
        dispatch(
          Alert_Message({
            msgType: messagesType.errorMsg,
            msg: err,
          })
        );
      }
    );
  }, [refresh]);

  const header = [
    {
      id: "#",
      label: "#",
    },
    {
      id: "discription",
      label: "Discription",
    },
    {
      id: "action",
      label: "Actions",
    },
  ];

  const onEdit = (r) => {
    console.log(r, "rrrrr");
    setEdit(r);
  };

  const onUpdate = (r) => {
    console.log(r, "rrrrr", todo);
    updateTodo(
      todo, r.todo_id, 
      (res) => {
        dispatch(
          Alert_Message({
            msgType: messagesType.successMsg,
            msg: "Todo Updated!",
          })
        );
        setEdit('')
        setRefresh(!refresh);
      },
      (err)=>{
        dispatch(
          Alert_Message({
            msgType: messagesType.successMsg,
            msg: err,
          })
        );
      });
  };
  const onDelete = (r) => {
    console.log(r, "rrrrr", todo);
    deleteTodo(
      r.todo_id, 
      (res) => {
        setRefresh(!refresh);

        dispatch(
          Alert_Message({
            msgType: messagesType.successMsg,
            msg: "Todo Deleted!",
          })
        );
      },
      (err)=>{
        dispatch(
          Alert_Message({
            msgType: messagesType.successMsg,
            msg: err,
          })
        );
      });
  };
  return (
    <div>
      <div>
        <Card
          cardTitle="Insert Todo"
          subTitle="enter your day list....."
          style={{ width: "50%", caretColor: "none" }}
        >
          <div style={{ marginTop: 10 }}>
            <input type="text" onChange={onChange} />
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={onSubmit}
            >
              <NoteAdd />
            </Button>
          </div>
        </Card>
      </div>
      <div>
        <Card
          cardTitle="Todo List"
          style={{ width: "50%", caretColor: "none" }}
        >
          <TableUi
            header={header}
            data={todoList}
            onEdit={onEdit}
            onChange={onChange}
            onUpdate={onUpdate}
            onDelete={onDelete}
            edit={edit}
          />
        </Card>
      </div>
    </div>
  );
};

export default TodoList;
