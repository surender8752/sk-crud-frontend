import { useState } from "react";
import API from "../api";

const EditUser = ({ user, refresh }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);

  const update = async () => {
    try {
      await API.put(`/api/users/${user._id}`, {
        ...user,
        name,
      });
      setOpen(false);
      refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Update failed");
    }
  };

  if (!open) {
    return (
      <button
        className="btn-outline"
        onClick={() => setOpen(true)}
      >
        Edit
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        className="input w-32"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn" onClick={update}>
        Save
      </button>
    </div>
  );
};

export default EditUser;
