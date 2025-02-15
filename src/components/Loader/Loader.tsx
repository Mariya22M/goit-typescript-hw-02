import { Puff } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={s.loader_container}>
      <Puff color="#a8c6ff" />
    </div>
  );
};

export default Loader;