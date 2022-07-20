import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../enums'
import Card from './UI/Card'
import PlayStopButton from './UI/PlayButton'
import dayjs from 'dayjs'

interface Props {
  id: number,
  ownerId: number,
  title: string,
  createdAt: string,
  updatedAt: string,
  isRunning: boolean,
  onPlayStopClick?: () => void,
}

const ProjectCard: React.FC<Props> = (
  {
    id,
    ownerId,
    createdAt,
    updatedAt,
    title,
    isRunning,
    onPlayStopClick
  }
) => {
  const navigate = useNavigate()

  return (
    <Card
      className="bg-white w-full h-[10rem] py-[1.2rem] px-[1.2rem] border-[#f6f7ed] bg-slate-50 shadow-none
      transition-all duration-100
      hover:drop-shadow-lg
      active:shadow-inner active:drop-shadow-none"
      onClick={() => navigate(`${Pages.main}/${id}`)}
    >
      <div className="flex flex-col gap-y-[3rem]">
        <div
          className="flex flex-row gap-x-[0.5rem]"
        >
          <h1 className="grow font-semibold text-2xl text-left text-textPrimary tracking-wide">
            {title}
          </h1>
          <PlayStopButton
            isRunning={isRunning}
            onClick={() => {
              onPlayStopClick && onPlayStopClick()
            }}
          />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col grow">
            <h3 className="text-sm font-normal text-textSecondary text-left">
              Updated at
            </h3>
            <h2 className="text-lg font-normal text-textPrimary text-left">
              {dayjs(updatedAt).format('DD.MM.YY HH:mm')}
            </h2>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-normal text-textSecondary text-right">
              Created at
            </h3>
            <h2 className="text-lg font-normal text-textPrimary text-left">
              {dayjs(createdAt).format('DD.MM.YY HH:mm')}
            </h2>
          </div>
        </div>
      </div>
    </Card>
  )
}
export default ProjectCard
