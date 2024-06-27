import useModal from '@/hooks/useModal';

const Home: React.FC = () => {
  const { openModal } = useModal();

  return (
    <div>
      Home{' '}
      <div className='flex gap-[10px]'>
        <div className='flex flex-col gap-[10px]'>
          <button
            className='btn-violet h-[40px] w-[100px]'
            onClick={() => {
              openModal({ type: 'inviteMember', props: { columnId: 1 } });
            }}
          >
            초대하기
          </button>
          <button
            className='btn-violet h-[40px] w-[100px]'
            onClick={() => {
              openModal({ type: 'newColumn', props: { columnId: 1 } });
            }}
          >
            컬럼생성
          </button>
          <button
            className='btn-violet h-[40px] w-[100px]'
            onClick={() => {
              openModal({ type: 'columnModify', props: { columnId: 1, columnTitle: 'Done' } });
            }}
          >
            컬럼수정
          </button>
        </div>
        <div className='flex flex-col gap-[10px]'>
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
          <button
            className='btn-violet h-[40px] w-[125px]'
            onClick={() => {
              openModal({ type: 'columnDeleteConfirm', props: { columnId: 1 } });
            }}
          >
            컬럼 삭제
          </button>
        </div>
        <div>
          <button
            className='btn-violet h-[40px] w-[125px]'
            onClick={() => {
              openModal({ type: 'newDashboard' });
            }}
          >
            대시보드 생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
