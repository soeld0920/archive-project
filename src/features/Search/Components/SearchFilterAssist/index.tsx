import Wrapper from "shared/components/blocks/Wrapper";
import { AnimatePresence, motion } from "motion/react";
import ByAuthor from "./ByAuthor";
import ByView from "./ByView";
import ByDate from "./ByDate";
import ByGreat from "./ByGreat";
import DelFilter from "./DelFilter";
import { useSizeStore } from "shared/store/useSizeStore";
import CloseAssist from "./CloseAssist";
import useIsFilterAssistOpenStore from "../../store/isFilterAssistOpen";
import { useRef } from "react";

export default function SearchFilterAssist() {
  const {height} = useSizeStore("search-header");
  const {isFilterAssistOpen} = useIsFilterAssistOpenStore();
  const assistRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isFilterAssistOpen && (
      <motion.div 
      initial={{ height : 0 }}
      animate={{  height : "auto" }}
      exit={{ height : 0 }}
      transition={{ duration: 0.3 }}
      className="
      absolute left-0 w-full h-auto overflow-hidden z-90"
      style={{top : height}}
      key="modal"
      >
        <Wrapper >
          <div ref={assistRef} className="
            w-full h-auto
            bg-gray-200 border-4 border-gray-500 rounded-b-2xl p-4 shadow-1g
            ">
            <div>
              <CloseAssist/>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <ByAuthor />
              <ByView />
              <ByDate />
              <ByGreat />
              <DelFilter />
            </div>
          </div>
        </Wrapper>
      </motion.div>
      )}
    </AnimatePresence>
  );
} 