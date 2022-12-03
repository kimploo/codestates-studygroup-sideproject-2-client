import styled from "styled-components";

const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(128, 128, 128, 0.3);
`;

const ModalView = styled.div`
  width: 500px;
  height: 600px;
  padding:50px;
  background-color: #fff;
  position:relative;
  border-radius:10px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position:absolute;
  top: 0;
  right:0;
  background-color: #fff;
  border: 0;
  padding:10px 15px;
  font-size:30px;
  cursor: pointer;
`;

export const Modal = ({isModalOpen, openModalHandler, modalCont}) => {
  return (
    <>
      {isModalOpen ? (
        <>
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={openModalHandler} >&times;</CloseButton>
              {modalCont}
            </ModalView>
          </ModalBackdrop>
        </>
      ) : null}
    </>
  );
};
