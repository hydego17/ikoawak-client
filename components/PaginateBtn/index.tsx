import { TApiPost } from 'types/post';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export default function PaginateBtn({
  firstData,
  lastData,
  maxPage,
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

  //   console.log(posts);

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
    padding: 0.3rem 0.4rem;
    margin-left: 0.5rem;
    border-radius: 2px;
    border: 0;
    outline: 0;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    &:disabled {
      color: #858585;
    }
  }
`;
