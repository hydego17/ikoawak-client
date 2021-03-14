import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export default function PaginateBtn({
  initialData,
  setOffset,
  offset,
  fetchedPosts,
  mutate,
}) {
  // // State for disabled buttons
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const [pos, setPos] = useState(0);

  // Disable Pagination Button
  const posts = fetchedPosts?.data;

  const { firstData, lastData, maxPage } = initialData;

  useEffect(() => {
    if (posts) {
      const firstDisplayed = posts[0]?.slug;
      const lastDisplayed = posts[posts.length - 1]?.slug;
      setIsFirst(firstDisplayed === firstData ? true : false);
      setIsLast(lastDisplayed === lastData ? true : false);
    }
  }, [posts]);

  const updatePosts = async () => {
    if (pos < maxPage) {
      setPos(prev => prev + 1);
      await setOffset(prev => prev + 1);
      mutate(fetchedPosts);
      mutate(`api/posts?page=${offset}`);
    } else {
      await setOffset(prev => prev + 1);
    }
    return null;
  };

  return (
    <PaginateBtnStyled>
      <button
        className="paginate-btn"
        disabled={isFirst}
        onClick={() => {
          setOffset(prev => prev - 1);
        }}
      >
        Prev
      </button>
      <button className="paginate-btn" disabled={isLast} onClick={updatePosts}>
        Next
      </button>
    </PaginateBtnStyled>
  );
}

const PaginateBtnStyled = styled.div`
  text-align: center;
  padding: 2rem 0;

  .paginate-btn {
    margin-left: 0.5rem;
  }
`;
