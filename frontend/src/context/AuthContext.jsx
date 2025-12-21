import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek apakah ada kredensial tersimpan saat aplikasi dimuat
    const storedAuth = localStorage.getItem('auth_token');
    if (storedAuth) {
      setUser({ token: storedAuth });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Buat token Basic Auth (Base64)
    const token = 'Basic ' + btoa(`${username}:${password}`);

    try {
      // Coba panggil endpoint backend untuk verifikasi
      const response = await fetch('http://localhost:8080/api/auth/login', {
        headers: { 'Authorization': token }
      });

      if (response.ok) {
        // Jika sukses, simpan token di localStorage dan state
        localStorage.setItem('auth_token', token);
        setUser({ token });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);