import Image from 'next/image';

import ICON_PLUS from '../../public/icons/plusbox.svg';

import Button from '@/components/Button';

const Home: React.FC = () => (
  <div>
    Home
    <div className='flex flex-col gap-[20px]'>
      <div className='h-[50px] w-[520px]'>
        <Button
          onClick={() => {
            alert('버튼 클릭!');
          }}
          variant='primary'
          type='submit'
        >
          로그인
        </Button>
      </div>
      <div className='h-[40px] w-[105px]'>
        <Button
          variant='primary'
          className='text-[14px]'
          leftSection={<Image src={ICON_PLUS} alt='icon' width={20} height={20} />}
        >
          초대하기
        </Button>
      </div>
      <div className='flex gap-[10px]'>
        <div className='h-[32px] w-[84px]'>
          <Button className='text-[14px]' variant='primary'>
            수락
          </Button>
        </div>
        <div className='h-[32px] w-[84px]'>
          <Button className='text-[14px]' variant='secondary'>
            거절
          </Button>
        </div>
      </div>
      <div className='h-[28px] w-[52px]'>
        <Button variant='destructive' className='rounded-[4px] text-[12px]'>
          삭제
        </Button>
      </div>
      <div className='h-[50px] w-[520px]'>
        <Button disabled>로그인</Button>
      </div>
    </div>
  </div>
);

export default Home;
