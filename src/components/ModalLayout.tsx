import React from 'react'
import Card from './UI/Card'

export interface ModalLayoutProps {
  body: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  onClose: () => void;
  hiddenHeader?: boolean;
}

const ModalLayout: React.FC<ModalLayoutProps> = (
  {
    body,
    footer,
    title,
    onClose,
    hiddenHeader
  }
) => (
  <div
    className="fixed z-[1000] w-full h-full bg-shadowOverlay"
    onClick={onClose}
  >
    <Card
      className="w-fit h-fit bg-white mx-auto translate-y-[430%]"
      onClick={(event: Event) => event.stopPropagation()}
    >
      <div className="flex flex-col gap-y-[1rem]">
        {!hiddenHeader && (
          <div className="flex flex-row">
            {title && (
              <h1 className="grow font-bold text-2xl ">
                {title}
              </h1>
            )}
            <div
              className="ml-auto w-[1rem] h-[1rem] bg-red-500 hover:bg-red-400 active:bg-red-600 cursor-pointer"
              onClick={onClose}
            />
          </div>
        )}
        {body}
        {footer && (
          <>
            { footer }
          </>
        )}
      </div>
    </Card>
  </div>
)
export default ModalLayout
