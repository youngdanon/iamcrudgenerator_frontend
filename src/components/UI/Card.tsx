import React from 'react'

interface Props {
  children: React.ReactElement;
  className?: string;
  onClick?: (k?: any) => void;
}

const Card: React.FC<Props> = ({
  children,
  className,
  onClick
}) => (
  <div
    className={`p-[1rem] border-gray-300 shadow rounded-[16px] ${className}`}
    onClick={onClick}
  >
    { children }
  </div>
)

export default Card
