import Image from 'next/image';

import ProfileIcon from '@/components/ProfileIcon';
import Tags from '@/components/Tags';
import { Card as TCard } from '@/types/Card.interface';
import formatDate from '@/utils/formatDate';

interface CardProps {
  card: TCard;
}

export default function Card({ card }: CardProps) {
  return (
    <div className='mb-[16px] mt-[4px] flex flex-col gap-[10px] rounded-[6px] border border-gray-d9 bg-white p-[20px] transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:shadow-sm md:flex-row md:justify-between lg:flex-col dark:border-dark-200 dark:bg-dark'>
      {/* Card Image */}
      {card.imageUrl && (
        <section className='relative h-[160px] w-full rounded-[6px] md:mr-[10px] md:h-[54px] md:w-[90px] lg:h-[160px] lg:w-full'>
          <Image src={card.imageUrl} alt='카드 이미지' layout='fill' objectFit='cover' className='rounded-[8px]' />
        </section>
      )}

      <section className='mr-0 flex flex-col gap-[10px] md:mr-auto lg:mr-0'>
        {/* Card Title */}
        <div className='text-[16px] font-[500] text-black-33 dark:text-dark-10'>{card.title}</div>

        <div className='flex flex-col gap-[10px] md:flex-row lg:flex-col'>
          {/* Tags */}
          <Tags tags={card.tags} customClass='flex-wrap' />

          {/* CreatedAt & Assignee */}
          <div className='flex justify-between'>
            <div className='align-center gap-[6px]'>
              <span>
                <Image src='/icons/calendar.svg' width={18} height={18} alt='달력 아이콘' />
              </span>
              <span className='pt-[2px] text-[12px] font-[500] text-gray-78 dark:text-dark-10'>
                {formatDate(card.createdAt)}
              </span>
            </div>

            <div className='md:hidden lg:block'>
              {card.assignee && (
                <ProfileIcon
                  user={card.assignee}
                  userId={card.assignee.id}
                  imgClassName={`size-[34px] md:size-[38px]`}
                  fontClassName='md:font-base font-sm'
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className='hidden md:block lg:hidden'>
        {card.assignee && (
          <ProfileIcon
            user={card.assignee}
            userId={card.assignee.id}
            imgClassName={`size-[34px] md:size-[38px]`}
            fontClassName='md:font-base font-sm'
          />
        )}
      </section>
    </div>
  );
}
