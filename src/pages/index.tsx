import useModal from '@/hooks/useModal';

const Home: React.FC = () => {
  const { openModal } = useModal();

  return (
    <div>
      Home{' '}
      <div className='flex gap-[10px]'>
        <button
          className='btn-violet h-[40px] w-[100px]'
          onClick={() => {
            openModal({ type: 'inviteMember', props: null });
          }}
        >
          모달 열기
        </button>
        <button
          className='btn-violet h-[40px] w-[125px]'
          onClick={() => {
            openModal({ type: 'pwdNotEqual', props: null });
          }}
        >
          비밀번호 불일치
        </button>
        <button
          className='btn-violet h-[40px] w-[125px]'
          onClick={() => {
            openModal({ type: 'signupSuccess', props: null });
          }}
        >
          가입 완료
        </button>
        <button
          className='btn-violet h-[40px] w-[125px]'
          onClick={() => {
            openModal({ type: 'emailExists', props: null });
          }}
        >
          이메일 중복
        </button>
        <button
          className='btn-violet h-[40px] w-[125px]'
          onClick={() => {
            openModal({ type: 'curPwdNotEqual', props: null });
          }}
        >
          현재 비번 틀림
        </button>
      </div>
    </div>
  );
};

export default Home;
