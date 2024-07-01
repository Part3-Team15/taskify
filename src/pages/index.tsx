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
              openModal({ type: 'inviteMember', modalProps: { dashboardId: 9875 } });
            }}
          >
            초대하기
          </button>
          <button
            className='btn-violet h-[40px] w-[100px]'
            onClick={() => {
              openModal({ type: 'newColumn', modalProps: { dashboardId: 9875 } });
            }}
          >
            컬럼생성
          </button>
          <button
            className='btn-violet h-[40px] w-[100px]'
            onClick={() => {
              openModal({ type: 'columnModify', modalProps: { columnId: 33290, columnTitle: 'hi' } });
            }}
          >
            컬럼수정
          </button>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <button
            className='btn-violet h-[40px] w-[125px]'
            onClick={() => {
              openModal({ type: 'textModal', modalProps: { text: '비밀번호가 일치하지 않습니다.' } });
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
              openModal({ type: 'textModal', modalProps: { text: '현재 비밀번호가 틀렸습니다.' } });
            }}
          >
            현재 비번 틀림
          </button>
          <button
            className='btn-violet h-[40px] w-[125px]'
            onClick={() => {
              openModal({ type: 'columnDeleteConfirm', modalProps: { columnId: 1 } });
            }}
          >
            컬럼 삭제
          </button>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <button
            className='btn-violet h-[40px] w-[125px]'
            onClick={() => {
              openModal({ type: 'newDashboard' });
            }}
          >
            대시보드 생성
          </button>

          <button
            className='btn-violet h-[40px] w-[125px]'
            onClick={() => {
              openModal({ type: 'deleteDashboard', modalProps: { dashboardId: 9883 } });
            }}
          >
            대시보드 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
