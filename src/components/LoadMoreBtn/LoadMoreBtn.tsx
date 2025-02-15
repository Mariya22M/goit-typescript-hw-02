import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  handleChangePage: (e: React.MouseEvent) => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleChangePage }) => {
  return (
    <div className={s.Container}>
      <button
        onClick={handleChangePage}
        className={s.LoadMoreBtn}
        type="button"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;