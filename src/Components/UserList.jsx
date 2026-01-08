import { useEffect, useState } from "react";
import API from "../api";
import EditUser from "./EditUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const load = async () => {
    try {
      const res = await API.get(
        `/api/users?search=${search}&page=${page}`
      );
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    }
  };

  useEffect(() => {
    load();
  }, [search, page]);

  const del = async (id) => {
    try {
      await API.delete(`/api/users/${id}`);
      load();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl mb-4">👥 Users</h2>

      {/* 🔍 SEARCH + PAGINATION */}
      <div className="flex gap-3 mb-4">
        <input
          className="input"
          placeholder="Search user..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <button
          className="btn-outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button
          className="btn-outline"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {users.length === 0 && (
        <p className="text-gray-400">No users found</p>
      )}

      {users.map((u) => (
        <div key={u._id} className="user-row">
          <div>
            <b>{u.name}</b>
            <div className="text-gray-400 text-sm">
              {u.email} • {u.age}
            </div>
          </div>

          <div className="flex gap-2">
            <EditUser user={u} refresh={load} />
            <button
              onClick={() => del(u._id)}
              className="btn-red"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
