import { useState } from "react";

import styled from "@emotion/styled";

import { getAllProjects } from "lib/api";
import { useGetProjects } from "hooks/projects";

import Projects from "components/Projects";
import PaginateBtn from "components/PaginateBtn";
import PreviewAlert from "components/PreviewAlert";

export default function Home({ initialData, preview }) {
  // State for offset page query
  const [offset, setOffset] = useState(0);

  const { data: fetchedProjects, loading, error, mutate } = useGetProjects({
    offset,
    initialData,
  });

  const projects = fetchedProjects?.data;

  // Conditional Rendering
  let content = null;

  if (loading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <>
        <h2>Projects</h2>
        <article className="projects-list">
          {projects &&
            projects.map((project, index) => (
              <Projects key={index} project={project} />
            ))}
        </article>

        <PaginateBtn
          {...initialData}
          setOffset={setOffset}
          offset={offset}
          fetchedProjects={fetchedProjects}
          mutate={mutate}
        />
      </>
    );
  }

  return (
    <>
      <HomeStyled>
        <section className="intro">
          <h1>Hi, I'm Umma Ahimsha</h1>
          <p>a web developer</p>
        </section>
        {preview && <PreviewAlert />}
        {content}
      </HomeStyled>
    </>
  );
}

export async function getStaticProps() {
  const result = await getAllProjects();
  // Pass data to the page via props
  return {
    props: {
      initialData: {
        message: "Fetched Projects",
        data: result?.slice(0, 3),
        dataCount: result?.length,
        firstData: result ? result[0].slug : null,
        lastData: result ? result[result.length - 1].slug : null,
        maxPage: Math.ceil(result?.length / 3),
      },
    },
    revalidate: 1,
  };
}

const HomeStyled = styled.section`
  .intro {
    margin-bottom: 4rem;
    h1 {
      padding-right: 2rem;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
  }

  .projects-list {
    min-height: 30vh;
  }

  h2 {
    font-size: clamp(1.4rem, 5vw, 1.6rem);
  }
`;
