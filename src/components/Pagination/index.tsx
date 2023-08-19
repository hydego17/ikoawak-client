import { Button } from '../ui/button';

type PaginationProps = {
  isDisabled: boolean;
  currentPage: number;
  pagesQuantity?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  isDisabled,
  currentPage,
  pagesQuantity,
  onPageChange,
}) => {
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
    <div className='py-8 flex gap-2 justify-center'>
      <Button
        variant='secondary'
        size='sm'
        disabled={isFirst || isDisabled}
        onClick={handlePreviousClick}
      >
        Prev
      </Button>

      <Button variant='secondary' size='sm' disabled={isLast || isDisabled} onClick={handleNextClick}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
