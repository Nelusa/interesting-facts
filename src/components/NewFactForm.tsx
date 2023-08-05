import { useState } from "react";
import { Category } from "./CategoryFilter";
import { Fact } from "./Fact";
import supabase from "../data/supabase";

interface NewFactFormProps {
  categories: Category[];
  onAddFact: (newFact: Fact) => void;
  onShowForm: (showForm: boolean) => void;
}

function isValidHttpUrl(string: string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

const NewFactForm = ({
  categories,
  onAddFact,
  onShowForm,
}: NewFactFormProps) => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      text &&
      source &&
      category &&
      text.length <= 200 &&
      isValidHttpUrl(source)
    ) {
      /* const newFact = {
        id: Math.round(Math.random() * 1000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      }; */

      // Upload the new fact from the database

      setIsUploading(true);
      const { data: newFact } = await supabase
        .from("facts")
        .insert([{ text, source, category }]) // zde stačí data, která nemají defaultní hodnotu
        .select();
      setIsUploading(false);

      console.log(newFact);

      if (newFact && newFact.length > 0) {
        const firstNewFact = newFact[0] as Fact;
        onAddFact(firstNewFact);
      }

      setText("");
      setSource("");
      setCategory("");
      onShowForm(false);
    }
  };

  console.log("NewFactForm");
  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={handleTextChange}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={handleSourceChange}
      />
      <select
        value={category}
        onChange={handleCategoryChange}
        disabled={isUploading}
      >
        <option value="">Choose category ⬇️</option>
        {categories.map((category) => {
          return (
            <option key={category.name} value={category.name}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          );
        })}
      </select>
      <button disabled={isUploading} className="btn btn-large">
        Post
      </button>
    </form>
  );
};
export default NewFactForm;
