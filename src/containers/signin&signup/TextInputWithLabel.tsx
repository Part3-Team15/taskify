import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder: string;
  error?: string;
  register: UseFormRegister<T>;
}

export default function TextInputWithLabel<T extends FieldValues>({
  id,
  label,
  placeholder,
  error,
  register,
}: Props<T>) {
  let type = 'text';
  let autoComplete = 'off';

  if (id === 'email') {
    type = 'email';
    autoComplete = 'email';
  }

  return (
    <div>
      <label htmlFor={id} className='mb-[10px] block text-[16px] text-black-33'>
        {label}
      </label>
      <div className='relative'>
        <input
          {...register(id)}
          className={`h-[50px] w-full rounded-[8px] border border-gray-d9 bg-white px-[15px] text-[16px] text-black-33 placeholder:text-gray-9f ${
            error ? 'border-2 border-red' : ''
          }`}
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </div>
      {error && <p className='mt-[10px] text-[14px] text-red'>{error}</p>}
    </div>
  );
}
