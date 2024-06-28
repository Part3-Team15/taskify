import Image from 'next/image';

interface SearchBarProps {
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ handleChangeSearch }: SearchBarProps) {
  return (
    <div className='relative px-7'>
      <div className='absolute left-11 top-2 size-[24px]'>
        <Image src={'/icons/search.svg'} alt='search' fill />
      </div>
      <input
        placeholder='검색'
        className='size-full rounded-md border border-gray-d9 bg-white py-[8px] pl-12 pr-4'
        onChange={handleChangeSearch}
      />
    </div>
  );
}
