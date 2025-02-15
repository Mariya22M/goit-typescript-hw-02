import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "./App.css";

interface Image {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
}

interface UnsplashApiResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

const App: React.FC = () => {
  const [articles, setArticles] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    if (!query) return;

    const getArticlesData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get<UnsplashApiResponse>(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "QMDTanrFRxmDZa0TOSP83SoJlYeOIIQjN5BoN10efLM",
              per_page: 9,
              page: page,
              query: query,
            },
          }
        );
        if (response.data.results.length === 0) {
          toast.error("No images!");
          setArticles([]);
        } else {
          setArticles((prev) => [...prev, ...response.data.results]);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      getArticlesData();
    }
  }, [page, query]);

  const handleChangePage = (e: React.MouseEvent) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  const handleChangeQuery = (newQuery: string) => {
    if (newQuery === query) {
      toast.error("Please change query!");
      return;
    }
    setQuery(newQuery);
    setArticles([]);
    setPage(1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <>
          <ImageGallery articles={articles} onImageClick={openModal} />
          {articles.length > 0 && (
            <LoadMoreBtn handleChangePage={handleChangePage} />
          )}
        </>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </>
  );
};

export default App;
