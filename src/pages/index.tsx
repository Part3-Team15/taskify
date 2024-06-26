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
            openModal({ type: 'inviteMember' });
          }}
        >
          모달 열기
        </button>
        <button
          className='btn-violet h-[40px] w-[125px]'
          onClick={() => {
            openModal({ type: 'pwdNotEqual' });
          }}
        >
          비밀번호 불일치
        </button>
        <button
          className='btn-violet h-[40px] w-[125px]'
          onClick={() => {
            openModal({ type: 'signupSuccess' });
          }}
        >
          가입 완료
        </button>
        <button
          className='btn-violet h-[40px] w-[125px]'
          onClick={() => {
            openModal({ type: 'emailExists' });
          }}
        >
          이메일 중복
        </button>
        <button
          className='btn-violet h-[40px] w-[125px]'
          onClick={() => {
            openModal({ type: 'curPwdNotEqual' });
          }}
        >
          현재 비번 틀림
        </button>
      </div>
    </div>
  );
};

export default Home;
