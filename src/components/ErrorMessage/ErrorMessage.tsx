import s from "./ErrorMessage.module.css";

const ErrorMessage: React.FC = () => {
  return (
    <div>
      <p className={s.errorText}>Error loading images.</p>
    </div>
  );
};

export default ErrorMessage;
