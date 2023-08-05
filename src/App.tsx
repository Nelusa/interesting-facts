import { useEffect, useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import FactsList from "./components/FactsList";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import { CATEGORIES, initialFacts } from "./data/data";
import { Fact } from "./components/Fact";
import supabase from "./data/supabase";
import Loader from "./components/Loader";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [facts, setFacts] = useState(initialFacts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //Explain this code

    // this is a function that fetches data from the database
    // it is an async function because it uses await
    const fetchFacts = async () => {
      setIsLoading(true);

      let query = supabase.from("facts").select("*"); // this is a query to the database; it selects all the data from the facts table

      if (currentCategory !== "all")
        // if the current category is not "all", then the query is filtered by the current category
        query = query.eq("category", currentCategory); // this is a filter

      const { data: facts, error } = await query
        .order("votesInteresting", { ascending: false }) // this is a sort (order by)
        .limit(1000); // this is a sort (limit)

      if (!error) setFacts(facts);
      else alert("There was a problem getting data");
      setIsLoading(false);
    };
    fetchFacts();
  }, [currentCategory]);

  const handleSetCategory = (categoryName: string) => {
    setCurrentCategory(categoryName);
  };

  const handleShowForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleAddFact = (newFact: Fact) => {
    console.log(newFact);

    setFacts((prevData) => [newFact, ...prevData]);
  };

  return (
    <>
      <div>
        <Header showForm={showForm} onShowForm={handleShowForm} />
        {showForm && (
          <NewFactForm
            categories={CATEGORIES}
            onAddFact={handleAddFact}
            onShowForm={setShowForm}
          />
        )}

        <main className="main">
          <CategoryFilter
            categories={CATEGORIES}
            onSetCategory={handleSetCategory}
          />

          {isLoading ? (
            <Loader />
          ) : (
            <FactsList
              facts={facts}
              currentCategory={currentCategory}
              onSetFacts={setFacts}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
