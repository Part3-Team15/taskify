import Image from 'next/image';

import ProfileIcon from '@/components/ProfileIcon';
import { Card as TCard } from '@/types/Card.interface';
import formatDate from '@/utils/formatDate';
import generateTagColor from '@/utils/generateTagColor';

interface CardProps {
  card: TCard;
}

const tagClassMapping: { [key: string]: { text: string; bg: string } } = {
  // 태그 컬러 - 정적 클래스 미리 생성
  pink: { text: 'text-pink-tagtext', bg: 'bg-pink-tagbg' },
  blue: { text: 'text-blue-tagtext', bg: 'bg-blue-tagbg' },
  green: { text: 'text-green-tagtext', bg: 'bg-green-tagbg' },
  orange: { text: 'text-orange-tagtext', bg: 'bg-orange-tagbg' },
};

export default function Card({ card }: CardProps) {
  return (
    <div className='mb-[16px] mr-[6px] mt-[4px] flex flex-col gap-[10px] rounded-[6px] border border-gray-d9 bg-white p-[20px] transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:shadow-sm md:flex-row md:justify-between lg:flex-col'>
      {/* Card Image */}
      {card.imageUrl && (
        <section className='relative h-[160px] w-full rounded-[6px] md:mr-[10px] md:h-[54px] md:w-[90px] lg:h-[160px] lg:w-full'>
          <Image src={card.imageUrl} alt='카드 이미지' layout='fill' objectFit='cover' className='rounded-[8px]' />
        </section>
      )}

      <section className='mr-0 flex flex-col gap-[10px] md:mr-auto lg:mr-0'>
        {/* Card Title */}
        <div className='text-[16px] font-[500] text-black-33'>{card.title}</div>

        <div className='flex flex-col gap-[10px] md:flex-row lg:flex-col'>
          {/* Tags */}
          <div className='flex flex-wrap gap-[6px]'>
            {card.tags.map((tag, index) => {
              const tagColor = generateTagColor();
              const tagClass = tagClassMapping[tagColor];
              return (
                <span
                  key={index}
                  className={`${tagClass.text} ${tagClass.bg} align-center h-[24px] flex-row rounded-[4px] px-[6px] pb-[2px] pt-[4px] text-[12px]`}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          {/* CreatedAt & Assignee */}
          <div className='flex justify-between'>
            <div className='align-center gap-[6px]'>
              <span>
                <Image src='/icons/calendar.svg' width={18} height={18} alt='달력 아이콘' />
              </span>
              <span className='pt-[2px] text-[12px] font-[500] text-gray-78'>{formatDate(card.createdAt)}</span>
            </div>

            <div className='md:hidden lg:block'>
              <ProfileIcon
                user={card.assignee}
                userId={card.assignee.id}
                imgClassName={`size-[34px] md:size-[38px]`}
                fontClassName='md:font-base font-sm'
              />
            </div>
          </div>
        </div>
      </section>
      <section className='hidden md:block lg:hidden'>
        <ProfileIcon
          user={card.assignee}
          userId={card.assignee.id}
          imgClassName={`size-[34px] md:size-[38px]`}
          fontClassName='md:font-base font-sm'
        />
      </section>
    </div>
  );
}
