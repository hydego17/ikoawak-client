import { NextSeo } from "next-seo";
import styled from "@emotion/styled";
import { useGetArchive } from "hooks/archive";
import Link from "next/link";
import { getAllArchives } from "lib/archive";

export default function Archive({ initialData }) {
  const { data, loading } = useGetArchive({ initialData });

  const format = (date) => {
    return date.substring(0, 10);
  };

  const SEO = {
    title: "Archives",
    description: "Some of my writing, poems and proses",
    canonical: "https://hydego.me/archive",
    openGraph: {
      title: "Umma Ahimsha",
      url: "https://hydego.me/archive",
      description: "Some of my writing, poems and proses",
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <ArchiveStyled>
        <h1>Tulisan</h1>
        <hr />
{/* 
        {loading && <h3>Loading...</h3>} */}

        {/* <table>
          <tbody>
            {data &&
              data.map((archive, index) => (
                <tr key={index} className="archive">
                  <td className="archive_title">
                    <Link
                      href="/archive/[slug]"
                      as={`/archive/${archive.slug}`}
                    >
                      <a> {archive.title} </a>
                    </Link>
                  </td>
                  <td className="archive_date">
                    <time dateTime={format(archive.date)}>
                      {format(archive.date)}
                    </time>
                  </td>
                </tr>
              ))}
          </tbody>
        </table> */}
      </ArchiveStyled>
    </>
  );
}

export async function getStaticProps() {
  const initialData = await getAllArchives();
  return { props: { initialData }, revalidate: 1 };
}

const ArchiveStyled = styled.section`
  table {
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    td {
      padding: 0.4rem 0;

      &.archive_date {
        text-align: right;
      }
    }
  }

  h1 {
    font-size: clamp(1.75rem, 2.5vw, 2rem);
    padding-bottom: 1rem;
  }

  p {
    padding-top: 1rem;
  }
`;
