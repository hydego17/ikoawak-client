import { useRouter } from "next/router";
import styled from "@emotion/styled";
import BlockContent from "@sanity/block-content-to-react";

import { getAllArchives, getSingleArchive } from "lib/archive";
import PreviewAlert from "components/PreviewAlert";

export default function Archive({ archive, preview }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h2> Loading... </h2>;
  }

  return (
    <ArchiveStyled>
      {preview && <PreviewAlert />}

      <header>
        <h1>{archive.title}</h1>
      </header>

      <hr />

      <BlockContent blocks={archive.content} />
    </ArchiveStyled>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const archive = await getSingleArchive(params.slug, preview);

  return {
    props: {
      archive,
      preview,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const archives = await getAllArchives();

  const paths = archives?.map((p) => ({
    params: {
      slug: p.slug,
    },
  }));

  return { paths, fallback: true };
}

// Style
const ArchiveStyled = styled.article`
  max-width: 600px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
  }
  h1 {
    font-size: clamp(1.4rem, 2.5vw, 1.75rem);
  }
`;
