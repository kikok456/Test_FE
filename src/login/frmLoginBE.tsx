import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  setIsLogin: (val: boolean) => void;
  setUsername: (val: string) => void;
  setStatus: (val: string) => void;
};

export default function LoginModal({
  show,
  onClose,
  setIsLogin,
  setUsername,
  setStatus,
}: Props) {

  const [mounted, setMounted] = useState(false);
  const [modalRoot, setModalRoot] =
    useState<HTMLElement | null>(null);

  // 🔥 input form
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    setModalRoot(document.getElementById("modal-root"));
  }, []);

  useEffect(() => {
    if (!show) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [show, onClose]);

  // 🔥 LOGIN
  const handleLogin = async () => {
    setError("");

    try {

      const res = await fetch(
        "https://test-be-chi-eight.vercel.app/api/login_supabase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameInput,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login gagal");
        return;
      }

      // 🔥 simpan localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("status", data.status);

      // 🔥 update global state
      setIsLogin(true);
      setUsername(data.username);
      setStatus(data.status);

      console.log("Login success:", data);

      // 🔥 reset form
      setUsernameInput("");
      setPassword("");
      setError("");

      // 🔥 tutup modal
      onClose();

    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  if (!mounted || !show || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 bg-white rounded-2xl shadow-xl p-8 w-[350px]"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-2xl font-bold mb-5 text-center">
          Login
        </h2>

        {/* Username */}
        <input
          type="text"
          className="w-full border rounded p-2 mb-3"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) =>
            setUsernameInput(e.target.value)
          }
        />

        {/* Password */}
        <input
          type="password"
          className="w-full border rounded p-2 mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
          onClick={handleLogin}
        >
          Masuk
        </button>

      </div>
    </div>,
    modalRoot
  );
}
