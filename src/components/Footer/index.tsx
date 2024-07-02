import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='flex h-[100px] w-dvw items-center justify-around bg-dark-500 text-gray-9f'>
      <div>
        <p>©codeit - 2023</p>
      </div>
      <div>
        <p> Privacy Policy </p>
        <p> FAQ </p>
      </div>
      <div>
        <Link href='/'> Github </Link>
      </div>
    </footer>
  );
}
