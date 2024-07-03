export default function TagsWrapper({ tags, onTagClick }: { tags: string[]; onTagClick: (tag: string) => void }) {
  return (
    <div className='mt-[10px] flex flex-wrap gap-[10px]'>
      {tags.map((tag) => (
        <div
          // 태그 컬러만 지정해주면 됨
          className='cursor-pointer text-nowrap rounded-[6px] border border-gray-d9 px-1'
          key={`tag-${tag}-key`}
          onClick={() => {
            onTagClick(tag);
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
