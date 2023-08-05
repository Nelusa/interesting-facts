import { useState } from "react";
import { CATEGORIES } from "../data/data";
import supabase from "../data/supabase";

export interface Fact {
  id: number;
  text: string;
  source: string;
  category: string;
  votesInteresting: number;
  votesMindblowing: number;
  votesFalse: number;
  createdIn: number;
}

interface FactProps {
  fact: Fact;
  onSetFacts: React.Dispatch<React.SetStateAction<Fact[]>>;
}

const Fact = ({ fact, onSetFacts }: FactProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesFalse > fact.votesInteresting + fact.votesMindblowing;

  const handleVote = async (columnName: keyof Fact) => {
    setIsUpdating(true);
    const newVoteValue = Number(fact[columnName]) + 1; // Získá aktuální hodnotu hlasů pro konkrétní sloupec (např. "votesInteresting") z objektu fact (aktuální fakt). Přičte k ní 1 a uloží do proměnné newVoteValue.

    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: newVoteValue })
      .eq("id", fact.id) //Metoda eq slouží k filtraci řádků, kde id odpovídá fact.id.
      .select(); //Metoda select vrátí aktualizovaný záznam nebo případnou chybu.

    setIsUpdating(false);

    //this function is called when the vote is updated
    if (!error && updatedFact)
      onSetFacts(
        (facts: Fact[]) =>
          facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)) //in this line, we are mapping through the facts array and updating the fact that was voted
        //Metoda map se používá k projití pole faktů. Pokud id faktu odpovídá fact.id, nahradí se starý fakt novým updatedFact[0] (aktualizovaným záznamem).
      );
  };

  return (
    <li className="fact">
      {isDisputed && <span className="disputed">[❌ DISPUTED]</span>}
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            ?.color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
};
export default Fact;

/* enum VoteType {
  Interesting = "👍",
  Mindblowing = "🤯",
  False = "⛔️",
}

const Fact = ({ fact }: FactProps) => {
  const [votes, setVotes] = useState<Record<VoteType, number>>({
    [VoteType.Interesting]: 0,
    [VoteType.Mindblowing]: 0,
    [VoteType.False]: 0,
  });

  const handleVote = (voteType: VoteType) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [voteType]: prevVotes[voteType] + 1,
    }));
  };

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            ?.color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        {Object.values(VoteType).map((voteType) => (
          <button
            key={voteType}
            onClick={() => handleVote(voteType as VoteType)}
          >
            {voteType} <strong>{votes[voteType]}</strong>
          </button>
        ))}
      </div>
    </li>
  );
};
export default Fact; */
