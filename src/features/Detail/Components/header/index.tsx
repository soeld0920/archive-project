import Wrapper from "shared/components/blocks/Wrapper";
import styles from "features/Detail/DetailPage.module.css";
import DetailHero from "./Hero";
import DetailMetaBar from "./MetaBar";
import WritingActions from "./WritingActions";
import { api } from "axios/api";
import { useEffect, useState } from "react";
import { useWritingContext } from "features/Detail/context/WritingContext";
import isSignin from "shared/lib/utils/isSignin";

export default function DetailHeader(){
  const [loginUserUuid, setLoginUserUuid] = useState<string | null>(null);
  const {writing} = useWritingContext();

  useEffect(() => {
    const fetchLoginUuid = async () => {
      if(!isSignin()) return;
      const response = await api.get("/user/me");
      if(response.status === 200) setLoginUserUuid(response.data.userUuid);
      else setLoginUserUuid(null);
    }
    fetchLoginUuid();
  }, []);

  return(
    <header className={styles.header}>
      <Wrapper className={styles.headerWrapper}>
        <DetailHero/>
        <DetailMetaBar/> 
      </Wrapper>
        {loginUserUuid === writing?.authorUuid ? <Wrapper><WritingActions/></Wrapper> : <></>}
    </header>
  )
}