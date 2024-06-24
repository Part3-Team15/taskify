import Image from 'next/image';
import Link from 'next/link';

import logo from '@/../public/icons/logo.svg';
import plus from '@/../public/icons/plus.svg';

export default function Sidebar() {
  return (
    <aside className='mr-4 flex h-screen w-72 flex-col gap-14 border-r border-gray_d9 px-4 py-6'>
      <div>
        <Link href='/'>
          <Image src={logo} alt='logo' priority />
        </Link>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <p className='text-xs font-bold text-gray_78'>Dash boards</p>
          <a href='' className='p-3'>
            <Image src={plus} alt='add' />
          </a>
        </div>

        <div className='mb-2 border-b border-gray_d9' />

        <ul className='flex flex-col gap-2'></ul>
      </div>
    </aside>
  );
}
