import Fact, { Fact as FactType } from "./Fact";

interface FactsListProps {
  facts: FactType[];
  currentCategory: string;
  onSetFacts: React.Dispatch<React.SetStateAction<FactType[]>>;
}

const FactsList = ({ facts, onSetFacts }: FactsListProps) => {
  /*  const filteredFacts = facts.filter(
    (fact) => currentCategory === "all" || fact.category === currentCategory
  ); */

  return (
    <section>
      {facts.length > 0 ? (
        <ul className="facts-list">
          {facts.map((fact) => (
            <Fact key={fact.id} fact={fact} onSetFacts={onSetFacts} />
          ))}
        </ul>
      ) : (
        <p className="message">
          No facts for this category yet! Create the first one ✌️
        </p>
      )}
      <p>There are {facts.length} facts in the database.</p>
    </section>
  );
};
export default FactsList;
