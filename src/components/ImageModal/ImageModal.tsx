import Modal from "react-modal";
import s from "./ImageModal.module.css";

interface Image {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      className={s.modal}
      overlayClassName={s.overlay}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
    >
      <div className={s.modal_content} onClick={closeModal}>
        <img
          className={s.img}
          src={image?.urls?.regular}
          alt={image?.alt_description || "Image"}
        />
        <p>
          {image ? image.alt_description : ""}
        </p>
      </div>
    </Modal>
  );
};

export default ImageModal;
