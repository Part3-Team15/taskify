import NavButton from '../Button/NavButton';

export default function Pagination() {
  // TODO: 기능 구현
  const handleLeftClick = () => {};
  const handleRightClick = () => {};

  return (
    <div className='flex items-center justify-end'>
      {/* NOTE: 민재님꺼 pt-3 있었음 */}
      <span className='pr-3 text-xs text-black-33 md:pr-4 md:text-sm'>1 페이지 중 1</span>

      <NavButton direction='left' onClick={handleLeftClick} />
      <NavButton direction='right' onClick={handleRightClick} />
    </div>
  );
}
