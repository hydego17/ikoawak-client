import styled from '@emotion/styled';
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <FooterStyled>
        <div className="container">
          <div className="social-links">
            <a
              title="Twitter"
              href="https://twitter.com/umma_ahimsha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              title="Github"
              href="https://github.com/hydego17"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>

            <a
              title="Email"
              href="mailto:uahimsha@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
            </a>
          </div>

          <div className="copyright">
            <small>
              Copyright &copy; {new Date().getFullYear()} Rahmat Panji
            </small>
          </div>
        </div>
      </FooterStyled>
    </>
  );
}

const FooterStyled = styled.footer`
  text-align: center;
  padding: 4rem 0 2rem 0;

  .container {
    .social-links {
      padding-bottom: 1rem;
      svg {
        color: #747d8c;
        font-size: 1.2rem;
        margin-right: 1rem;
      }
    }
  }
`;
