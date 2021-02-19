import { NextSeo } from "next-seo";
import styled from "@emotion/styled";

export default function About() {
  const SEO = {
    title: "About Me – Umma Ahimsha",
    description: "About me | Umma Ahimsha",
    canonical: "https://hydego.me/about",
    openGraph: {
      title: "About Me - Umma Ahimsha",
      url: "https://hydego.me/about",
      description: "About me | Umma Ahimsha",
    },
  };
  // Add sanity page
  return (
    <>
      <NextSeo {...SEO} />
      <AboutStyled>
        <h1>Tentang</h1>
        <hr />

        <article>
          <p>
            My name is Umma Ahimsha, I'm a Front-End developer based in Jakarta,
            Indonesia.
          </p>

          <p>
            Though I spend most of my time writing code for building User
            Interfaces, I've also fiddled around with back-end technologies and
            databases.
          </p>

          <p>
            Back then I used to love books, words and everything in between. If
            you're into literary stuff, feel free to read my poems and proses
            (mostly in Indonesian) in the archive.
          </p>

          <p>
            You can reach me at{" "}
            <a href="mailto:uahimsha@gmail.com">uahimsha@gmail.com</a>
          </p>
        </article>
      </AboutStyled>
    </>
  );
}

const AboutStyled = styled.section`
  h1 {
    font-size: clamp(1.75rem, 2.5vw, 2rem);
    padding-bottom: 1rem;
  }

  article {
    max-width: 600px;
  }

  p {
    padding-top: 1rem;
  }
`;
