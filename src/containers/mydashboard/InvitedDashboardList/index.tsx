import ActionButton from '@/components/Button/ActionButton';
import CancelButton from '@/components/Button/CancelButton';
import Image from 'next/image';

export default function InvitedDashboardList() {
  return (
    <div className='h-full max-w-screen-lg overflow-hidden rounded-lg border-0 bg-white'>
      <p className='px-7 pb-5 pt-8 text-base font-bold text-black-33'>초대받은 대시보드</p>
      <div className='relative px-7'>
        <Image src={'/icons/search.svg'} alt='search' width={24} height={24} className='absolute left-11 top-2' />
        <input
          placeholder='검색'
          className='h-full w-full rounded-md border border-gray-d9 bg-white py-[8px] pl-12 pr-4'
        />
      </div>

      <div className='h-[calc(100%-150px)] pt-6'>
        <div className='grid grid-cols-3 pb-6 pl-7'>
          <p>이름</p>
          <p>초대자</p>
          <p className='w-44'>수락 여부</p>
        </div>

        <ul className='h-full overflow-y-scroll'>
          <li className='grid h-16 grid-cols-3 border-b border-gray-ee pl-7'>
            <p className='flex items-center'>대시보드 이름</p>
            <p className='flex min-w-28 items-center'>초대자 이름</p>
            <div className='flex items-center gap-[10px]'>
              <ActionButton>수락</ActionButton>
              <CancelButton>거절</CancelButton>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
