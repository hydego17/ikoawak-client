import styled from "@emotion/styled";
import Link from "next/link";
import { urlFor } from "lib/api";

export default function Projects({ project }) {
  const { title, subtitle, coverImage, slug, link, code } = project;

  return (
    <ProjectsStyled className="project-card">
      <figure className="card-image">
        <img
          src={urlFor(coverImage).width(150).url()}
          alt={title}
          width={150}
          height={100}
        />
      </figure>
      <article className="card-body">
        <Link target="_blank" as={`projects/${slug}`} href="projects/[slug]">
          <a className="project-title">
            <h3>{title}</h3>
          </a>
        </Link>

        <hr />

        <p>{subtitle}</p>

        <div className="links">
          <small>
            <a href={link} target="_blank" rel="noopener">
              Site
            </a>
          </small>

          {code && (
            <small>
              <a href={code} target="_blank" rel="noopener">
                Code
              </a>
            </small>
          )}
        </div>
      </article>
    </ProjectsStyled>
  );
}

const ProjectsStyled = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 1rem;
  padding: 1rem;
  transition: box-shadow 0.3s ease;

  .card-body {
    width: 100%;

    p {
      line-height: 1.5;
    }
  }

  .card-image {
    display: flex;
    align-items: center;
    padding: 0.2rem;
    flex-shrink: 1;
    overflow: hidden;
    border-radius: 5px;
    margin-right: 2rem;

    @media screen and (max-width: 678px) {
      display: none;
    }
  }

  .project-title {
    display: block;

    &:hover {
      text-decoration: underline;
    }

    padding-bottom: 0.5rem;
  }

  .links {
    display: flex;
    margin-top: 1rem;

    small {
      padding-right: 0.5rem;
    }
  }

  hr {
    padding: 0.25rem;
  }
`;
