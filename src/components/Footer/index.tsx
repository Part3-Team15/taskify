import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='flex h-[100px] w-dvw items-center justify-around bg-dark-500 text-white'>
      <div>
        <p>@2024</p>
      </div>
      <div>
        <Link href='/'> Privacy Policy </Link>
        <Link href='/'> FAQ </Link>
      </div>
      <div>
        <Link href='/'> Github </Link>
      </div>
    </footer>
  );
}
