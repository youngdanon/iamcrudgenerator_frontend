import React from 'react'
import { icons } from '../../enums'

/** Виды кнопок */
export type ButtonVariantProps = 'primary' | 'secondary' | 'neutral' | 'clear' | 'dashed';

export interface ButtonProps {
  /** Текст кнопки */
  title: string;
  /** Иконка кнопки */
  icon?: keyof typeof icons;
  /** Функция на клик */
  onClick?: ()=> void;
  /** Активность кнопки */
  isDisabled?: boolean;
  /** Вариант кнопки */
  variant?: ButtonVariantProps;
  /** Направление иконки
   * @format '90deg' */
  iconRotation?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  onClick,
  isDisabled,
  variant,
  iconRotation
}) => {
  switch (variant) {
    case 'primary':
      return (
        <div
          className="flex flex-row gap-x-2 bg-primary py-2 px-[1rem] rounded-[4px] cursor-pointer justify-center"
          onClick={() => onClick && onClick()}
        >
          {icon && (
            <div>
              <img
                src={icons[icon]}
                className={`w-4 h-4 my-auto rotate-[${iconRotation}]`}
                alt={title}
              />
            </div>
          )}
          <h4>{title}</h4>
        </div>
      )
    default:
      return (
        <div
          className="flex flex-row gap-x-2 bg-primary py-1 px-[1rem] rounded-[4px] cursor-pointer justify-center"
          onClick={() => onClick && onClick()}
        >
          {icon && (
            <img
              src={icons[icon]}
              className={`w-4 h-4 my-auto rotate-[${iconRotation}]`}
              alt={title}
            />
          )}
          <h4 className="text-white font-semibold">{title}</h4>
        </div>
      )
  }
}
export default Button
