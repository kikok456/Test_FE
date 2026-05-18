import Background from "./componen/bg";
import gambar1 from "./assets/logo2.png";
import { useState, useEffect } from "react";
import LoginModal from "./login/frmLoginBE";
import RegisterModal from "./pages/frmRegister";
import { HashLink } from "react-router-hash-link";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import { ChevronDown } from "lucide-react";

export default function App() {
  // 🔥 pisahin state
  const [isLogin, setIsLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  // 🔥 cek token saat load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    const stat = localStorage.getItem("status");
    if (token && user) {
      setIsLogin(true);
      setUsername(user);
      setStatus(stat || "");
  }
  }, []);

useEffect(() => {

  if (!isLogin) return;

  let timeout: NodeJS.Timeout;

  const resetTimer = () => {

    clearTimeout(timeout);

    timeout = setTimeout(() => {

      // logout
      localStorage.clear();

      setIsLogin(false);
      setUsername("");
      setStatus("");

      console.log("Session expired");

    }, 10 * 60 * 1000);
  };

  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("click", resetTimer);
  window.addEventListener("scroll", resetTimer);

  resetTimer();

  return () => {

    clearTimeout(timeout);

    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keydown", resetTimer);
    window.removeEventListener("click", resetTimer);
    window.removeEventListener("scroll", resetTimer);
  };

}, [isLogin]);

  
  useEffect(() => {
  const handleScroll = () => {
    const aboutSection = document.getElementById("about-us");

    if (!aboutSection) return;

    const sectionTop = aboutSection.offsetTop;

    // kalau scroll sudah lewat section
    if (window.scrollY > sectionTop - 120) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  
  return (
    <div className="app">
      <div className="hero-section">
        <Background />
        {/* NAVBAR */}
        <div className="navbar">
          <div className="navbar-logo flex items-center gap-3">
            <img src={gambar1} alt="logo" />
              <h1
                className={`
                  text-xl font-bold
                  transition-all duration-500
                  ${
                    showTitle
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }
                `}
              >
                <span className="text-[#6E1170]">Elkyas </span>
                <span className="text-black">Karya Agung</span>
              </h1>
          </div>

          <div className="navbar-menu">
            <Link to="/" className="navbar-btn">Promo</Link>
            
            {isLogin && (<HashLink smooth to="/#upload-data" className="navbar-btn"> 
              Upload Data
            </HashLink>)}

            <HashLink smooth to="/#check-harga" className="navbar-btn"> 
              Check Harga
            </HashLink>

            <div className="dropdown-wrapper inline-block group">
                  
                <button className="navbar-btn flex items-center gap-1">
                  <span>About</span>

                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className="
                      mt-[1px]
                      transition-transform
                      duration-200
                      group-hover:rotate-180
                    "
                  />
                </button>              

                <div className="navbar-dropdown">
                  <div className="navbar-group-dd">
                    <HashLink smooth to="/#about-us" className="navbar-btn-dd">
                      About Us
                    </HashLink>
                  </div>

                  <div className="navbar-group-dd">
                    <HashLink smooth to="/#contact-us" className="navbar-btn-dd">
                      Contact Person
                    </HashLink>
                  </div>
              </div>
            </div>

            {/* login logout */}
              {isLogin ? (
                <div className="relative inline-block group">
                  
                <button className="navbar-btn flex items-center gap-1">
                  <span>Hallo, {username}</span>

                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className="
                      mt-[1px]
                      transition-transform
                      duration-200
                      group-hover:rotate-180
                    "
                  />
                </button>

                  <div className="navbar-dropdown">
                    {status === "Admin" && (
                  // 🔥 ADMIN
                  <div className="navbar-group-dd">
                      <button
                        className="navbar-btn-dd"
                        onClick={() => setShowRegister(true)}
                      >
                        Register
                      </button>
                  </div>
                    )}
                  <div className="navbar-group-dd">
                      <button
                        className="navbar-btn-dd"
                        onClick={() => {
                          localStorage.clear();

                          setIsLogin(false);
                          setUsername("");
                          setStatus("");
                        }}
                      >
                        Logout
                      </button>
                  </div>

                    </div>
                  </div>

              ) : (

                // 🔥 BELUM LOGIN
                <button
                  className="navbar-btn"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>

              )}
              </div>
              </div>


        {/* ROUTES */}
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home isLogin={isLogin} />} />
          </Routes>

          <LoginModal
            show={showLogin}
            onClose={() => setShowLogin(false)}
            setIsLogin={setIsLogin} // 🔥 penting
            setUsername={setUsername}
            setStatus={setStatus}
          />
          <RegisterModal
            show={showRegister}
            onClose={() => setShowRegister(false)}
          />
        </div>
      </div>
    </div>
  );
}
