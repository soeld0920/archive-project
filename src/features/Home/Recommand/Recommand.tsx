import { useState } from "react";
import RecommandTablist from "./components/RecommandTablist";
import styles from "features/Home/Recommand/Recommand.module.css";
import Recent from "./recent";
import Series from "./series/Series";
import Binners from "./binners/components";

type RecommandTypes = "binners" | "recent" | "series";

export default function Recommand(){
  const [recommandType, setRecommandType] = useState<RecommandTypes>("binners");

  return (
    <section aria-labelledby="recommand-title"  className={styles.wrapper}>
      <RecommandTablist recommandType={recommandType} setRecommandType={setRecommandType} />
      {recommandType === "binners" ? 
        <Binners/>
      : recommandType === "recent" ? 
        <Recent/>
      : 
        <Series/>
      }
    </section>
  );
}

