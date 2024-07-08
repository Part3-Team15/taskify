interface toggleProps {
  isOn: boolean;
  onToggleClick: () => void;
}

export default function Toggle({ isOn, onToggleClick }: toggleProps) {
  return (
    <button type='button' onClick={onToggleClick} className='relative h-fit'>
      <div className={`h-7 w-11 rounded-2xl bg-gray-d9 ${isOn ? 'bg-green duration-500' : ''}`} />
      <div className={`absolute left-1 top-1 size-5 rounded-full bg-white duration-500 ${isOn ? 'left-5' : ''}`} />
    </button>
  );
}
