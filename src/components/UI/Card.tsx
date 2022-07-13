import React from 'react'

interface Props {
  children: React.ReactElement
  className?: string
}

const Card: React.FC<Props> = ({
  children,
  className
}) => (
  <div className={'p-[1rem] border-gray-300 shadow rounded-[16px] ' + className}>
    { children }
  </div>
)

export default Card
