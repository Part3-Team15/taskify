import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import ModalActionButton from '@/components/Button/ModalActionButton';
import { closeModal } from '@/store/reducers/modalSlice';

export default function SignUpSuccessModal() {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className='h-[220px] w-[327px] rounded-[8px] bg-white px-[28px] py-[32px] md:h-[250px] md:w-[540px]'>
      <div className='relative flex size-full items-center justify-center'>
        <h1 className='mb-[15px] text-[16px] text-black-33 md:text-[18px]'>가입이 완료되었습니다!</h1>
        <ModalActionButton
          className='absolute bottom-0 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0'
          onClick={() => {
            dispatch(closeModal());
            router.push('/signin');
          }}
        >
          로그인
        </ModalActionButton>
      </div>
    </div>
  );
}
