import { useState } from 'react';
import { NextSeo } from 'next-seo';
import styled from '@emotion/styled';

import { useGetPosts } from 'hooks/posts';
import Link from 'next/link';
import { getAllPosts, getPaginatedPosts } from 'lib/post';

import PaginateBtn from 'components/PaginateBtn';

export default function Archive({ initialData }) {
  const SEO = {
    title: 'Post',
    description: 'Some of my writing, poems and proses',
    canonical: 'https://hydego.me/archive',
    openGraph: {
      title: 'Umma Ahimsha',
      url: 'https://hydego.me/archive',
      description: 'Some of my writing, poems and proses',
    },
  };

  // State for offset page query
  const [offset, setOffset] = useState(0);

  const { data: fetchedPosts, loading, error, mutate } = useGetPosts({
    offset,
    initialData,
  });

  const posts = fetchedPosts?.data;

  const format = date => {
    return date.substring(0, 10);
  };

  // Conditional Rendering
  let content = null;

  if (loading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <>
        <table>
          <tbody>
            {posts &&
              posts.map((post, index) => (
                <tr key={index} className="archive">
                  <td className="archive_title">
                    <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                      <a> {post.title} </a>
                    </Link>
                  </td>
                  <td className="archive_date">
                    <time dateTime={format(post.publishedAt)}>
                      {format(post.publishedAt)}
                    </time>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <PaginateBtn
          {...initialData}
          setOffset={setOffset}
          offset={offset}
          fetchedPosts={fetchedPosts}
          mutate={mutate}
        />
      </>
    );
  }

  return (
    <>
      <NextSeo {...SEO} />
      <ArchiveStyled>
        <h1>Tulisan</h1>
        <hr />

        {content}
      </ArchiveStyled>
    </>
  );
}

export async function getStaticProps() {
  const result = await getAllPosts();

  // Pass data to the page via props
  return {
    props: {
      initialData: {
        message: 'Fetched Posts',
        data: result?.slice(0, 10),
        dataCount: result?.length,
        firstData: result ? result[0].slug : null,
        lastData: result ? result[result.length - 1].slug : null,
        maxPage: Math.ceil(result?.length / 10),
      },
    },
    revalidate: 1,
  };
}

const ArchiveStyled = styled.section`
  table {
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    td {
      padding: 0.75rem 0;

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
