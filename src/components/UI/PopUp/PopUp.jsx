import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import useUserStore from "@/store/user";

const PopUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const isUserProfileOpened = useUserStore(
    (state) => state.isUserProfileOpened
  );

  const modalStyle = {
    position: "absolute",
    top: "0",
    right: "0",
  };

  useEffect(() => {
    isUserProfileOpened ? onOpen() : onClose;
  }, [setUserProfile]);

  return (
    <Modal
      style={modalStyle}
      placement="bottom"
      isOpen={isOpen}
      onClose={() => {
        setUserProfile(false);
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PopUp;
