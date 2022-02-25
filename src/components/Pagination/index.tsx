import styled from '@emotion/styled';

type PaginationProps = {
  isDisabled: boolean;
  currentPage: number;
  pagesQuantity?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ isDisabled, currentPage, pagesQuantity, onPageChange }) => {
  // state
  const isFirst = currentPage === 1;
  const isLast = pagesQuantity ? currentPage > pagesQuantity - 1 : true;

  // handlers
  const handlePreviousClick = () => {
    if (!isFirst) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (!isLast) onPageChange(currentPage + 1);
  };

  return (
    <PaginationStyled>
      <button className="paginate-btn" disabled={isFirst || isDisabled} onClick={handlePreviousClick}>
        Prev
      </button>
      <button className="paginate-btn" disabled={isLast || isDisabled} onClick={handleNextClick}>
        Next
      </button>
    </PaginationStyled>
  );
};

const PaginationStyled = styled.div`
  text-align: center;
  padding: 2rem 0;

  .paginate-btn {
    margin-left: 0.5rem;
  }
`;

export default Pagination;
