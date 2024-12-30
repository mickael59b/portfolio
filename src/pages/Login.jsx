import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Importation de Helmet
import { useAuth } from '../context/AuthContext'; // Importation de votre contexte Auth
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import visual from '../assets/images/pankaj-patel-1IW4HQuauSU-unsplash.webp';
import git from '../assets/images/1_mtsk3fQ_BRemFidhkel3dA.webp';
import figma from '../assets/images/team-nocoloco-YRUj8BENrVQ-unsplash.webp';
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
            <div className="row">
              <div className="col-md-5 offset-md-1 d-none d-md-inline-block">
                <div className="position-relative pt-5">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 3000, // Le délai entre chaque transition (3 secondes)
                      disableOnInteraction: false, // L'autoplay continue même après l'interaction de l'utilisateur (clic, swipe, etc.)
                      pauseOnMouseEnter: true, // L'autoplay se met en pause lorsque la souris est au-dessus du Swiper
                    }}
                  >
                    <SwiperSlide>
                      <div className="swiper-slide-content d-flex justify-content-center align-items-center">
                        <div className="text-center text-white p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                          <img src={visual} alt="Visual Studio Code" className="w-100 rounded" />
                          <h5 className="fw-medium fs-16 mt-3">Visual Studio Code</h5>
                          <p className="text-muted">Coding with the powerful and customizable Visual Studio Code editor.</p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="swiper-slide-content d-flex justify-content-center align-items-center">
                        <div className="text-center text-white p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                          <img src={git} alt="Git Version Control" className="w-100 rounded" />
                          <h5 className="fw-medium fs-16 mt-3">Git Version Control</h5>
                          <p className="text-muted">Efficient code management and collaboration with Git.</p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="swiper-slide-content d-flex justify-content-center align-items-center">
                        <div className="text-center text-white p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                          <img src={figma} alt="Figma" className="w-100 rounded" />
                          <h5 className="fw-medium fs-16 mt-3">Figma</h5>
                          <p className="text-muted">Designing interfaces and prototypes using Figma for seamless collaboration.</p>
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