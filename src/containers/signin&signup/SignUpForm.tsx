import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import PwdInputWithLabel from '@/containers/signin&signup/PwdInputWithLabel';
import TextInputWithLabel from '@/containers/signin&signup/TextInputWithLabel';
import useModal from '@/hooks/useModal';
import { postSignUp } from '@/services/postService';
import hashPassword from '@/utils/hashPassword';

export type TSignUpInputs = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

const schema = yup.object().shape({
  email: yup.string().email('유효한 이메일 주소를 입력해주세요.').required('이메일을 입력해주세요.'),
  nickname: yup.string().required('닉네임을 입력해주세요.').max(10, '닉네임은 최대 10자까지 가능합니다.'),
  password: yup.string().required('비밀번호를 입력해주세요.').min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
  passwordConfirmation: yup
    .string()
    .required('비밀번호 확인을 입력해주세요.')
    .oneOf([yup.ref('password'), ''], '비밀번호가 일치하지 않습니다.'),
});

export default function SignUpForm() {
  const router = useRouter();
  const { openNotificationModal } = useModal();

  const [checkTerms, setCheckTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    resetField,
    setFocus,
  } = useForm<TSignUpInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleEmailExist = () => {
    resetField('email');
    setFocus('email');
  };

  const handleSignUpSuccess = () => {
    router.push('/signin');
  };

  const onSubmit = async (data: TSignUpInputs) => {
    const { password } = data;
    try {
      await postSignUp({ ...data, password: hashPassword(password) });
      openNotificationModal({ text: '가입이 완료되었습니다!', onClick: handleSignUpSuccess });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        openNotificationModal({ text: '중복된 이메일 입니다.', onClick: handleEmailExist });
      } else if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          openNotificationModal({ text: error.response.data.message });
        }
      } else {
        openNotificationModal({ text: '회원가입을 실패하였습니다.' });
        console.log(error);
      }
    }
  };

  return (
    <form className='flex flex-col gap-[20px]' onSubmit={handleSubmit(onSubmit)}>
      <TextInputWithLabel
        id='email'
        label='이메일'
        placeholder='이메일을 입력해 주세요'
        error={errors.email?.message}
        register={register}
      />
      <TextInputWithLabel
        id='nickname'
        label='닉네임'
        placeholder='닉네임을 입력해 주세요'
        error={errors.nickname?.message}
        register={register}
      />
      <PwdInputWithLabel
        id='password'
        label='비밀번호'
        placeholder='비밀번호를 입력해 주세요'
        error={errors.password?.message}
        register={register}
      />
      <PwdInputWithLabel
        id='passwordConfirmation'
        label='비밀번호 확인'
        placeholder='비밀번호를 한번 더 입력해 주세요'
        error={errors.passwordConfirmation?.message}
        register={register}
      />
      <div>
        <input
          id='terms'
          type='checkbox'
          checked={checkTerms}
          onChange={() => {
            setCheckTerms(!checkTerms);
          }}
        />{' '}
        <label htmlFor='terms' className='text-[16px] text-black-33'>
          이용약관에 동의합니다.
        </label>
      </div>
      <button type='submit' disabled={!isValid || !checkTerms} className='btn-violet h-[50px] text-lg'>
        가입하기
      </button>
    </form>
  );
}
