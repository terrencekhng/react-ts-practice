import React, { useState } from "react";

type ModalProps = {
  defaultOpened: boolean;
  children: React.ReactNode;
}

const Modal = (props: ModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(props.defaultOpened);

  return (isOpen ?
    <div className="modal">
      {props.children}
    </div> : <></>)

}

export default Modal;
