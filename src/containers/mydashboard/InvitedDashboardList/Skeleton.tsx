export default function Skeleton() {
  return (
    <div className='flex animate-pulse flex-col'>
      <div className='px-7'>
        <div className='size-full h-[40px] rounded-md bg-gray-fa py-[8px] pl-12 pr-4' />
      </div>
      <div className='h-[calc(100%-130px)] pt-6 md:h-[calc(100%-170px)]'>
        <div className='hidden h-[48px] grid-cols-9 pb-6 pl-7 md:grid md:pr-7'>
          <div className='h-[24px] rounded-md bg-gray-fa' />
          <div className='col-span-2' />
          <div className='h-[24px] rounded-md bg-gray-fa' />
          <div className='col-span-2' />
          <div className='h-[24px] rounded-md bg-gray-fa' />
          <div className='col-span-2' />
        </div>

        <div className='h-full overflow-y-hidden'>
          <div className='hidden h-[48px] grid-cols-6 pb-6 pl-7 md:grid md:pr-7'>
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
          </div>
          <div className='hidden h-[48px] grid-cols-6 pb-6 pl-7 md:grid md:pr-7'>
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
          </div>
          <div className='hidden h-[48px] grid-cols-6 pb-6 pl-7 md:grid md:pr-7'>
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
          </div>
          <div className='hidden h-[48px] grid-cols-6 pb-6 pl-7 md:grid md:pr-7'>
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
          </div>
          <div className='hidden h-[48px] grid-cols-6 pb-6 pl-7 md:grid md:pr-7'>
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
            <div className='h-[24px] rounded-md bg-gray-fa' />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
