import { useState } from "react";
import CheckBox from "shared/components/blocks/InputComponets/CheckBox";
import InputText from "shared/components/blocks/InputComponets/InputText";
import InputTextNumber from "shared/components/blocks/InputComponets/InputTextNumber";
import Dropdown from "shared/components/blocks/InputComponets/Dropdown";
import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";
import CancelButton from "shared/components/blocks/InputComponets/CancelButton";

export default function Research(){
  const [searchText, setSearchText] = useState("3");
  const [searchTextNumber, setSearchTextNumber] = useState<number | null>(null);
  const [searchCheckBox, setSearchCheckBox] = useState(false);
  return(
    <div>
      <InputText value={searchText} setValue={setSearchText} placeholder="검색어를 입력하세요" width="500px" />
      <InputTextNumber value={searchTextNumber} setValue={setSearchTextNumber} placeholder="검색어를 입력하세요" width="500px" />
      <CheckBox value={searchCheckBox} setValue={setSearchCheckBox} size="30px" />
      <Dropdown options={["1", "2", "3"]} value={searchText} onChange={setSearchText} label={`label : ${searchText}`} width="500px" height="30px" />
      <SubmitButton onClick={() => console.log("submit")} label="submit" width="500px" height="30px" />
      <CancelButton onClick={() => console.log("cancel")} label="cancel" width="500px" height="30px" />
    </div>
  )
}