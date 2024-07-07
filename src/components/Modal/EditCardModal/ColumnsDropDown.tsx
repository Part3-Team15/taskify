export default function ColumnsDropDown({
  columns,
  onSelectColumn,
}: {
  columns: {
    id: number;
    title: string;
  }[];
  onSelectColumn: (columnId: number) => void;
}) {
  return (
    <ul className='absolute top-[110%] z-[9999] w-full rounded-[6px] border border-gray-d9 bg-white px-4 py-2 dark:border-dark-200 dark:bg-dark-300'>
      {columns.map((column) => {
        return (
          <li
            className='flex cursor-pointer items-center rounded-[6px] px-[6px] py-[5px] text-[14px] transition-all hover:bg-violet-e8 md:text-[16px] dark:hover:bg-dark-200'
            key={`member-${column.id}`}
            onClick={() => {
              onSelectColumn(column.id);
            }}
          >
            <div className='flex h-[22px] items-center gap-[6px] rounded-[12px] bg-violet-f1 p-[8px] text-[12px] text-violet dark:bg-dark-purple-hover dark:text-dark-10'>
              <p className='text-[10px]'>●</p>
              <p className='w-max'>{column.title}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
