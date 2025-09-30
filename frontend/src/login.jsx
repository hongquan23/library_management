// Login.jsx
import React, { useEffect, useState } from "react";
import styles from "./login.module.css"; // ✅ dùng CSS Module
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser, loginUser } from "./api"; // ✅ import API

// Component PasswordInput dùng chung
const PasswordInput = ({ value, onChange, placeholder, show, toggleShow }) => (
  <div className={styles.passwordContainer}>
    <input
      type={show ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
    <span className={styles.togglePassword} onClick={toggleShow}>
      {show ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
);

const AuthForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // state riêng cho từng form
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener("click", () => {
        container.classList.add(styles.rightPanelActive); // ✅ CSS Module class
      });
      signInButton.addEventListener("click", () => {
        container.classList.remove(styles.rightPanelActive); // ✅ CSS Module class
      });
    }
  }, []);

  // Hàm điều hướng theo role
  const redirectByRole = (userRole) => {
    if (userRole === "ADMIN") {
      navigate("/admin");
    } else if (userRole === "LIBRARIAN") {
      navigate("/librarian");
    } else {
      navigate("/app");
    }
  };

  // Đăng ký
// Đăng ký
const handleSignUp = async (e) => {
  e.preventDefault();

  if (password.length < 8) {
    alert("Mật khẩu phải có ít nhất 8 ký tự!");
    return;
  }

  try {
    const newUser = {
      username: name,
      email: email,
      password: password,
      role: role,
    };

    const response = await registerUser(newUser); // gọi API backend
    alert("Đăng ký thành công!");

    // Chuyển về màn hình login
    document.getElementById("container").classList.remove(styles.rightPanelActive);
    console.log("Data gửi lên backend:", newUser);

  } catch (error) {
    console.error("Đăng ký lỗi:", error);
    alert(error.response?.data?.detail || "Đăng ký thất bại!");
  }
};


  // Đăng nhập
  // Đăng nhập
const handleSignIn = async (e) => {
  e.preventDefault();

  try {
    const loginData = {
      email: email,
      password: password,
    };

    const response = await loginUser(loginData);
    const { access_token } = response.data;

    // Lưu token và role vào localStorage
    localStorage.setItem("token", access_token);

    // Giải mã token để lấy role
    const decoded = JSON.parse(atob(access_token.split(".")[1]));
    const userRole = decoded.role;

    localStorage.setItem("role", userRole);

    alert("Đăng nhập thành công!");
    redirectByRole(userRole);
  } catch (error) {
    console.error("Đăng nhập lỗi:", error);
    alert(error.response?.data?.detail || "Đăng nhập thất bại!");
  }
};


  // Quên mật khẩu
  const handleForgotPassword = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Chưa có tài khoản để khôi phục!");
      return;
    }
    if (resetEmail === user.email) {
      if (newPassword.length < 6) {
        alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
        return;
      }
      user.password = newPassword;
      localStorage.setItem("user", JSON.stringify(user));
      alert("Mật khẩu đã được thay đổi thành công!");
      setForgotMode(false);
      setNewPassword("");
      setResetEmail("");
    } else {
      alert("Email không khớp!");
    }
  };

  return (
    <div className={styles.container} id="container">
      {/* Form Đăng ký */}
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            show={showPasswordSignUp}
            toggleShow={() => setShowPasswordSignUp(!showPasswordSignUp)}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="MEMBER">MEMBER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="LIBRARIAN">LIBRARIAN</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Form Đăng nhập hoặc Quên mật khẩu */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        {!forgotMode ? (
          <form onSubmit={handleSignIn}>
            <h1>Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              show={showPasswordSignIn}
              toggleShow={() => setShowPasswordSignIn(!showPasswordSignIn)}
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="MEMBER">MEMBER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="LIBRARIAN">LIBRARIAN</option>
            </select>

            <button type="submit">Sign In</button>
            <p style={{ marginTop: "10px" }}>
              <button
                type="button"
                onClick={() => setForgotMode(true)}
                style={{
                  border: "none",
                  background: "none",
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <h1>Reset Password</h1>
            <p>Nhập email và mật khẩu mới</p>
            <input
              type="email"
              placeholder="Email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />

            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password (min 6 chars)"
              show={showNewPassword}
              toggleShow={() => setShowNewPassword(!showNewPassword)}
            />

            <button type="submit">Update Password</button>
            <p style={{ marginTop: "10px" }}>
              <button
                type="button"
                onClick={() => setForgotMode(false)}
                style={{
                  border: "none",
                  background: "none",
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Back to Sign In
              </button>
            </p>
          </form>
        )}
      </div>

      {/* Overlay */}
      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
            <h1>Welcome Back!</h1>
            <p>Please login with your personal info</p>
            <button className="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start your journey with us</p>
            <button className="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
