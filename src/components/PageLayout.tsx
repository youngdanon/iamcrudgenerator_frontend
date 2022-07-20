import React from 'react'
import Button, { ButtonProps } from './UI/Button'
import Card from './UI/Card'

interface Props {
  children: React.ReactNode;
  buttons?: ButtonProps[];
  title?: string;
}

const PageLayout: React.FC<Props> = (
  {
    children,
    title,
    buttons
  }
) => {
  return (
    <Card className="w-full h-full bg-white p-[2rem]">
      <div className="flex flex-col gap-y-[2rem] h-full">
        <h1 className="text-5xl font-bold text-left">{title}</h1>
        {!buttons && <hr/>}
        { buttons &&
          (
            <div className="flex flex-col gap-y-[1rem]">
              <hr/>
              <div className="flex flex-row gap-x-2">
                {buttons.map((buttonProps, index) => (
                  <div
                    key={buttonProps.title + index.toString()}
                    className="w-fit"
                  >
                    <Button
                      {...buttonProps}
                    />
                  </div>
                ))
                }
              </div>
              <hr/>
            </div>
          )
        }
        { !buttons && <hr/> }
        <div className="h-full">
          {children}
        </div>
      </div>
    </Card>
  )
}
export default PageLayout
