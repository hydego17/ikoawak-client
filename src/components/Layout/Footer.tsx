import styled from '@emotion/styled';
import { FaTwitter, FaEnvelope } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

export default function Footer() {
  return (
    <>
      <FooterStyled>
        <div className="container">
          <div className="social-links">
            <a title="Twitter" href="https://twitter.com/rhmtpanji" target="_blank" rel="noopener noreferrer">
              <FaTwitter /> Twitter
            </a>
            <a
              title="Instagram"
              href="https://www.instagram.com/rahmatpanji_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram /> Instagram
            </a>

            <a title="Email" href="mailto:ikoawakpanji@mail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope /> Email
            </a>
          </div>
          <div className="copyright">
            <small>Copyright &copy; {new Date().getFullYear()} Rahmat Panji</small>
          </div>
        </div>
      </FooterStyled>
    </>
  );
}

const FooterStyled = styled.footer`
  .container {
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin-top: 4rem;
    margin-bottom: 1rem;
    text-align: center;

    .social-links {
      justify-content: center;
      display: flex;
      margin-bottom: 1rem;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-meta);
        font-size: 0.9rem;
        margin: 0 0.5rem;

        &:hover {
          color: var(--hoverClr);
        }

        svg {
          margin-right: 5px;
        }
      }
    }
  }
`;
