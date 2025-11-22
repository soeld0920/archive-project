import { useState } from "react";
import MB from "./binners/MB";
import MR from "./recent/MR";
import MS from "./series/MS";
import MRTablist from "./components/MRTablist";
import styles from "styles/modules/Main/Recommand.module.css";

type RecommandTypes = "binners" | "recent" | "series";

export default function MRecommand(){
  const [recommandType, setRecommandType] = useState<RecommandTypes>("binners");

  return (
    <section aria-labelledby="mrecommand-title"  className={styles.wrapper}>
      <MRTablist recommandType={recommandType} setRecommandType={setRecommandType} />
      {recommandType === "binners" ? 
        <MB/>
      : recommandType === "recent" ? 
        <MR/>
      : 
        <MS/>
      }
    </section>
  );
}