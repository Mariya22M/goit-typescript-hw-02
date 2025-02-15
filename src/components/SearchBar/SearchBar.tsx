import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  handleChangeQuery: (newQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleChangeQuery }) => {
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }

    handleChangeQuery(search.trim());
    setSearch("");
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.input_form}>
          <button type="submit" className={s.button} aria-label="Search">
            <FaSearch size={20} className={s.search_icon} />
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
