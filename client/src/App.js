import { useState, useEffect } from "react";

import { API } from "./config/api";

import TableRowAxios from "./components/TableRowAxios";

function AxiosComponent() {
  const [todos, setTodos] = useState([]);
  const [idForUpdate, setIdForUpdate] = useState(null);
  const [form, setForm] = useState({
    name: "",
    active: "1",
  });

  const { name, active } = form;

  // LOAD/READ DATA
  const loadData = async () => {
    try {
      const response = await API.get("/insurance");
      setTodos(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [todos]);

  // ADD DATA
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        name,
        active: active === "1" ? 1 : 0,
      });

      const response = await API.post("/insurance", body, config);

      setForm({
        name: "",
        active: "1",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE DATA
  const deleteTodoById = async (id) => {
    try {
      await API.delete(`/insurance/${id}`);

      const updateTodo = todos.filter((todo) => todo.id !== id);

      setTodos(updateTodo);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE DATA
  const getTodoById = async (id) => {
    try {
      const response = await API.post(`/insurance/${id}`);
      const todo = response.data.data;
      setIdForUpdate(todo.id);

      setForm({
        name: todo.name ? todo.name : "",
        active: todo.active ? "1" : "0",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        name,
        active: active === "1" ? 1 : 0,
      });

      const response = await API.put(`/insurance/${idForUpdate}`, body, config);

      setIdForUpdate(null);

      setForm({
        name: "",
        active: "1",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-2 mb-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (idForUpdate) {
              updateTodo(); //update data
            } else {
              handleSubmit(); //add data
            }
          }}
        >
          <h3 className="text-center">
            Form {idForUpdate ? "Edit" : "Add"} Insurance
          </h3>
          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => onChange(e)}
              name="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Active</label>
            <select
              className="form-control"
              name="active"
              value={active}
              onChange={(e) => onChange(e)}
            >
              <option value="1">1</option>
              <option value="0">0</option>
            </select>
          </div>
          <div className="form-group">
            <button
              className="btn btn-sm btn-primary btn-block"
              disabled={!name || !active ? 1 : 0}
            >
              {idForUpdate ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div>
        <table className="table table-sm table-bordered table-striped table-hovered">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <TableRowAxios
                todo={todo}
                index={index}
                key={todo.id}
                getTodoById={getTodoById}
                deleteTodoById={deleteTodoById}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AxiosComponent;
