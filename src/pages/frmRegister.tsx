import { createPortal } from "react-dom";
import { useState } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
};

export default function RegisterModal({
  show,
  onClose,
}: Props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Member");

  if (!show) return null;

  const handleRegister = async () => {
    try {
      const res = await fetch(
        "https://test-be-chi-eight.vercel.app/api/register_supabase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            status,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Register berhasil");

        setUsername("");
        setPassword("");
        setStatus("Member");

        onClose();
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded w-[350px]">

        <h2 className="text-2xl font-bold mb-4">
          Register User
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        >
          <option value="Karyawan">Karyawan</option>
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
        </select>

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleRegister}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>

        </div>
      </div>
    </div>,
    document.body
  );
}
