import Tags from '@/components/Tags';

export default function TagsWrapper({ tags, onTagClick }: { tags: string[]; onTagClick: (tag: string) => void }) {
  return (
    <div className='mt-[10px] flex flex-wrap gap-[10px]'>
      <Tags tags={tags} />
    </div>
  );
}
