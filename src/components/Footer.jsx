// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import News from './Newsletter'; // Assurez-vous que le composant Newsletter existe et est fonctionnel
import '../assets/css/footer.css';

const Footer = () => {
  return (
    <footer className="footer pt-10 pb-5 mt-auto bg-light footer-light">
      <div className="container">
        <News /> {/* Insertion du composant News (newsletter) */}
        
        <div className="row">
          <div className="col-lg-3">
            <h5 className="footer-brand">Mickael Boutte</h5>
            <p className="mb-3">
              Développeur web | Passionné par l'innovation et la création d'expériences numériques.
            </p>
            <div className="social">
                <a href="https://github.com/mickael59b" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github me-1"></i>
                </a>
                <a href="https://x.com/BoutteMick5669" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-twitter me-1"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-google me-1"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-linkedin me-1"></i>
                </a>
              </div>
          </div>

          <div className="col-lg-9">
            <div className="row">
              {/* Liens supplémentaires avec configuration des chemins spécifiques */}
              <FooterLinks
                title="Produits"
                links={[
                  { name: 'Thèmes', path: '/themes' },
                  { name: 'Templates', path: '/templates' },
                  { name: 'UI Kits', path: '/ui-kits' },
                ]}
              />
              <FooterLinks
                title="Ressources"
                links={[
                  { name: 'Documentation', path: '/documentation' },
                  { name: 'Tutoriels', path: '/tutoriels' },
                  { name: 'Blog', path: '/blog' },
                ]}
              />
              <FooterLinks
                title="Entreprise"
                links={[
                  { name: 'À propos', path: '/about' }, // Remapping explicit
                  { name: 'Carrières', path: '/careers' },
                  { name: 'Contact', path: '/contact' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Section copyright */}
        <div className="text-center mt-4">
          <p className="small text-muted">&copy; 2024 Mickael Boutte | Acti-Informatique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

// Composant pour les liens de footer
const FooterLinks = ({ title, links }) => (
  <div className="col-md-4 mb-3">
    <h6 className="text-uppercase-expanded text-xs mb-4">{title}</h6>
    <ul className="list-unstyled mb-0">
      {links.map(({ name, path }, index) => (
        <li key={index} className="mb-2">
          <Link to={path}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;