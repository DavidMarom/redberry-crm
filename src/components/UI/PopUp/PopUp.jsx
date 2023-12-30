import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import useUserStore from "@/store/user";

const PopUp = ({
  style,
  title,
  body,
  footer = "",
  placement = "top",
  closePopUp,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const isUserProfileOpened = useUserStore(
    (state) => state.isUserProfileOpened
  );

  useEffect(() => {
    isUserProfileOpened ? onOpen() : onClose;
  }, [setUserProfile]);

  return (
    <Modal
      style={style}
      placement={placement}
      isOpen={isOpen}
      onClose={closePopUp}
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PopUp;
