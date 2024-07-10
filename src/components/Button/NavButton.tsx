import Image from 'next/image';

interface NavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  isDisable?: boolean;
}

// NOTE: 페이지네이션에서 쓰이는 흰색 버튼
export default function NavButton({ direction, onClick, isDisable }: NavButtonProps) {
  return (
    <button
      className={`btn-white rounded-none ${direction === 'left' ? 'rounded-s-[4px]' : 'rounded-e-[4px]'} size-9 md:size-10`}
      onClick={onClick}
      type='button'
      disabled={isDisable}
    >
      <div className={`${direction === 'left' ? 'rotate-180' : ''} relative h-[12px] w-[8px]`}>
        <Image src={'/icons/arrow-white.svg'} alt={`arrow-${direction}`} fill />
      </div>
    </button>
  );
}
