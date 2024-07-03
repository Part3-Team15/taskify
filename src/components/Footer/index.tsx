import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='flex h-[100px] w-full items-center justify-around bg-dark-500 text-gray-9f'>
      <div>
        <p>©codeit - 2023</p>
      </div>
      <div className='flex gap-5'>
        <p> Privacy Policy </p>
        <p> FAQ </p>
      </div>
      <div>
        <Link href='https://github.com/Part3-Team15/taskify'> Github </Link>
      </div>
    </footer>
  );
}
