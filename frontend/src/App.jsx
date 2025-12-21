import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SimpananList from "./pages/SimpananList";
import SimpananForm from "./pages/SimpananForm";
import PinjamanList from "./pages/PinjamanList";
import PinjamanForm from "./pages/PinjamanForm";
import BeritaList from "./pages/BeritaList";
import BeritaForm from "./pages/BeritaForm";
import GaleriList from "./pages/GaleriList";
import GaleriForm from "./pages/GaleriForm";
import FaqList from "./pages/FaqList";
import FaqForm from "./pages/FaqForm";
import KontakInfoForm from "./pages/KontakInfoForm";
import KarirForm from "./pages/KarirForm";
import KarirList from "./pages/KarirList";
import LamaranList from "./pages/LamaranList";
import PengurusList from "./pages/PengurusList";
import PengurusForm from "./pages/PengurusForm";
import TestimonialList from "./pages/TestimonialList";
import TestimonialForm from "./pages/TestimonialForm";
import StatistikForm from "./pages/StatistikForm";


function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/simpanan" element={<SimpananList />} />
              <Route path="/simpanan/baru" element={<SimpananForm />} />
              <Route path="/simpanan/edit/:id" element={<SimpananForm />} />
              <Route path="/pinjaman" element={<PinjamanList />} />
              <Route path="/pinjaman/baru" element={<PinjamanForm />} />
              <Route path="/pinjaman/edit/:id" element={<PinjamanForm />} />
              <Route path="/berita" element={<BeritaList />} />
              <Route path="/berita/baru" element={<BeritaForm />} />
              <Route path="/berita/edit/:id" element={<BeritaForm />} />
              <Route path="/galeri" element={<GaleriList />} />
              <Route path="/galeri/baru" element={<GaleriForm />} />
              <Route path="/galeri/edit/:id" element={<GaleriForm />} />
              <Route path="/faq" element={<FaqList />} />
              <Route path="/faq/baru" element={<FaqForm />} />
              <Route path="/faq/edit/:id" element={<FaqForm />} />
              <Route path="/pengaturan-kontak" element={<KontakInfoForm />} />
              <Route path="/karir" element={<KarirList />} />
              <Route path="/karir/baru" element={<KarirForm />} />
              <Route path="/karir/edit/:id" element={<KarirForm />} />
              <Route path="/lamaran" element={<LamaranList />} />
              <Route path="/pengurus" element={<PengurusList />} />
              <Route path="/pengurus/baru" element={<PengurusForm />} />
              <Route path="/pengurus/edit/:id" element={<PengurusForm />} />
              <Route path="/testimonials" element={<TestimonialList />} />
              <Route path="/testimonials/baru" element={<TestimonialForm />} />
              <Route
                path="/testimonials/edit/:id"
                element={<TestimonialForm />}
              />
              <Route path="/pengaturan-statistik" element={<StatistikForm />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
