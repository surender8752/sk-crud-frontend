import { useState } from "react";
import API from "../api";

const AddUser = ({ refresh }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
  });

  const submit = async () => {
    if (!user.name || !user.email || !user.age) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/api/users", {
        ...user,
        age: Number(user.age),
      });

      setUser({ name: "", email: "", age: "" });
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Add user failed");
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl mb-4">➕ Add User</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          className="input"
          placeholder="Name"
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Age"
          type="number"
          value={user.age}
          onChange={(e) =>
            setUser({ ...user, age: e.target.value })
          }
        />
      </div>

      <button onClick={submit} className="btn mt-4">
        Add
      </button>
    </div>
  );
};

export default AddUser;
