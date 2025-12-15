import { useState } from "react";

export default function useWritingInteraction(){
  const [great, setGreat] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  return {great, setGreat, bookmark, setBookmark};
}

