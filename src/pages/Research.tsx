import { useState } from "react";
import InputImage from "shared/components/blocks/InputComponets/InputImage";

export default function Research(){
  const [image, setImage] = useState<string | null>(null);

  return(
    <div>
      <InputImage width="500px" height="500px" setImage={setImage} />
      <img src={image ?? undefined} alt="image" />
    </div>
  )
}