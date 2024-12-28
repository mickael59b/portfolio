import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Importation de Helmet
import { useAuth } from '../context/AuthContext'; // Importation de votre contexte Auth
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { loginClient } from '../services/apiClient'; // Importation de la fonction de connexion

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Accédez à la fonction de login dans le contexte

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {token} = await loginClient(email, password);
      if (token) {
        localStorage.setItem('token', token);
        login(token);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err); 
      setError(err.message || 'Erreur inconnue');
    }
  };

  return (
    <section id="login">
      <Helmet>
        <title>Login - Intégrateur Web</title>
        <meta name="description" content="Page de connexion pour accéder au panneau d'administration de l'application." />
      </Helmet>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-xl-12">
            <div className="row g-0">
              <div className="col-md-5 offset-md-1 d-none d-md-inline-block">
                <div className="position-relative mt-5 pt-5">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                  >
                    <SwiperSlide>
                      <div className="swiper-slide-content">
                        <div className="row text-center">
                          <div className="col">
                            <img src="assets/images/hero/saas1.jpg" alt="Slide 1" className="w-75" />
                          </div>
                        </div>
                        <div className="row text-center my-4 pb-5">
                          <div className="col">
                            <h5 className="fw-medium fs-16">Manage your saas business with ease</h5>
                            <p className="text-muted">Make your saas application stand out with high-quality landing page designed and developed by professionals.</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="swiper-slide-content">
                        <div className="row text-center">
                          <div className="col">
                            <img src="assets/images/hero/saas2.jpg" alt="Slide 2" className="w-75" />
                          </div>
                        </div>
                        <div className="row text-center my-4 pb-5">
                          <div className="col">
                            <h5 className="fw-medium fs-16">Enhance your user experience</h5>
                            <p className="text-muted">Offer a seamless and intuitive user experience with a visually appealing design.</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-md-5 shadow p-4">
                <h6 className="h5 mb-0 mt-3">Welcome back!</h6>
                <p className="text-muted mt-1 mb-4">Enter your email address and password to access the admin panel.</p>
                <form onSubmit={handleSubmit} className="authentication-form">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email <small>*</small></label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password <small>*</small></label>
                    <a href="account-forget-password.html" className="float-end text-muted text-unline-dashed ms-1 fs-13">Forgot your password?</a>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                      <label className="form-check-label text-muted" htmlFor="checkbox-signin">Remember me</label>
                    </div>
                    <p className="text-muted mb-0">
                      <span>Don't have an account? </span>
                      <Link to="/register" className="text-primary fw-semibold ms-1">Sign Up</Link>
                    </p>
                  </div>

                  {error && <div className="text-danger mb-3">{error}</div>}

                  <div className="mb-0 text-center d-grid">
                    <button className="btn btn-primary" type="submit">Log In</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;