import React from 'react'
import { icons } from '../../enums'

interface PlayButtonProps {
  onClick: (e?: any) => void;
  className?: string;
  isRunning?: boolean;
}

const PlayStopButton: React.FC<PlayButtonProps> = (
  {
    onClick,
    className,
    isRunning = false
  }
) => {
  if (isRunning) {
    return (
      <div
        className={'w-[2rem] h-[2rem] rounded-full bg-danger hover:bg-dangerHover'}
        onClick={(event) => {
          event.stopPropagation()
          onClick()
        }}
      >
        <div className="w-[0.75rem] h-[0.75rem] bg-white mx-auto mt-[0.6rem] rounded-sm"/>
      </div>
    )
  }
  return (
    <div
      className={'w-[2rem] h-[2rem] rounded-full bg-success hover:bg-successHover'}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
    >
      <img
        alt={'Edit'}
        className="w-[1rem] ml-[0.6rem] mt-[0.44rem]"
        src={icons.triangle}
      />
    </div>
  )
}
export default PlayStopButton
