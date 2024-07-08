export default function ColumnSkeleton() {
  return (
    <div className='block animate-pulse lg:flex'>
      <div className='flex flex-col bg-gray-fa p-5 transition-colors lg:w-[354px] dark:bg-dark-bg'>
        {/* Column Header */}
        <div className='mb-[6px] flex cursor-default items-center justify-between'>
          <div className='flex items-center'>
            <span className='mr-[8px] text-xs text-violet'>𒊹</span>
            <span className='flex size-[20px] items-center justify-center rounded-[6px] bg-gray-ee text-xs text-gray-78 dark:bg-dark-200 dark:text-dark-10'></span>
          </div>
        </div>

        {/* Add Card Button */}
        <button className='btn-violet-light dark:btn-violet-dark mb-[16px] h-[40px] rounded-[6px] border-none hover:cursor-default hover:bg-white'></button>

        {/* Card List Section */}
        <div className='lg:h-[700px] lg:overflow-y-auto'>
          <div className='h-[200px] rounded-[6px] bg-white lg:h-[500px] dark:bg-dark'></div>
        </div>
      </div>
    </div>
  );
}
