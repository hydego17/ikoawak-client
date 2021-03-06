import styled from '@emotion/styled';
import { FaGithub, FaTwitter, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

export default function Footer() {
  return (
    <>
      <FooterStyled>
        <div className="container">
          <div className="copyright">
            <small>
              Copyright &copy; {new Date().getFullYear()} Rahmat Panji
            </small>
          </div>
          <div className="social-links">
            <a
              title="Twitter"
              href="https://twitter.com/rhmtpanji"
              target="_blank"
              rel="noopener noreferrer"
            >
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

            <a
              title="Email"
              href="mailto:ikoawakpanji@mail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope /> Email
            </a>
          </div>
        </div>
      </FooterStyled>
    </>
  );
}

const FooterStyled = styled.footer`
  text-align: center;
  padding: 4rem 0 2rem 0;
  margin-top: 4rem;
  margin-bottom: 2rem;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 678px) {
      flex-wrap: wrap-reverse;
      justify-content: center;

      .social-links {
        margin-bottom: 1rem;
      }
    }

    .social-links {
      display: flex;

      a {
        display: flex;
        align-items: center;
        color: #747d8c;
        font-size: 0.9rem;
        margin-right: 1rem;

        svg {
          margin-right: 5px;
        }
      }
    }
  }
`;
