import NavButton from '../Button/NavButton';

interface PaginationProps {
  currentChunk: number;
  totalPage: number;
  hideText?: boolean;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export default function Pagination({ currentChunk, totalPage, hideText, onNextClick, onPrevClick }: PaginationProps) {
  return (
    <div className='flex items-center justify-end'>
      <span className={`pr-3 text-xs text-black-33 md:pr-4 md:text-sm dark:text-dark-10 ${hideText ? 'hidden' : ''}`}>
        {totalPage} 페이지 중 {currentChunk}
      </span>

      <NavButton direction='left' onClick={() => onPrevClick()} isDisable={currentChunk === 1} />
      <NavButton direction='right' onClick={() => onNextClick()} isDisable={currentChunk === totalPage} />
    </div>
  );
}
