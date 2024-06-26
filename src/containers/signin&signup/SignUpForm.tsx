import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/Button';
import PwdInputWithLabel from '@/containers/signin&signup/PwdInputWithLabel';
import TextInputWithLabel from '@/containers/signin&signup/TextInputWithLabel';
import { postSignUp } from '@/services/postService';

export type TSignUpInputs = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

const schema = yup.object().shape({
  email: yup.string().email('유효한 이메일 주소를 입력해주세요.').required('이메일을 입력해주세요.'),
  nickname: yup.string().required('닉네임을 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.').min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
  passwordConfirmation: yup
    .string()
    .required('비밀번호 확인을 입력해주세요.')
    .oneOf([yup.ref('password'), ''], '비밀번호가 일치하지 않습니다.'),
});

export default function SignUpForm() {
  const [checkTerms, setCheckTerms] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<TSignUpInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const password = watch('password');
  const passwordConfirmation = watch('passwordConfirmation');

  useEffect(() => {
    if (password?.length > 0) {
      trigger('passwordConfirmation');
    }
  }, [password, passwordConfirmation, trigger]);

  const onSubmit = async (data: TSignUpInputs) => {
    try {
      await postSignUp(data);
      router.push('/signin'); // 회원가입이 성공되면 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('회원가입에 실패했습니다:', error);
      // 에러 처리 로직 추가 가능
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
      <div className='h-[50px]'>
        <Button type='submit' disabled={!isValid || !checkTerms}>
          가입하기
        </Button>
      </div>
    </form>
  );
}
