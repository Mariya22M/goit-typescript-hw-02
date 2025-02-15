import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
}

interface ImageGalleryProps {
  articles: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ articles, onImageClick }) => {
  return (
    <ul className={s.gallery_list}>
      {articles.map((article) => (
        <li key={article.id}>
          <div>
            <ImageCard
              src={article.urls.small}
              alt={article.alt_description || "Image"}
              onClick={() => onImageClick(article)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;