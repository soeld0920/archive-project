import Wrapper from "shared/components/blocks/Wrapper";
import styles from "features/Detail/DetailPage.module.css";
import DetailHero from "./Hero";
import DetailMetaBar from "./MetaBar";
import WritingActions from "./WritingActions";
import { useParams } from "react-router-dom";
import { useWritingDetail } from "features/Detail/hooks/query/useWritingDetail.tsx";
import { getMe } from "shared/api/getMe.tsx";
import { useQuery } from "@tanstack/react-query";
import isSignin from "shared/lib/utils/isSignin";

export default function DetailHeader(){
  const {UUID} = useParams();
  const {data : writingDetail, error, isLoading, isError} = useWritingDetail(UUID ?? "")

  const {data : loginUser, isLoading: loginUserLoading, isError: loginUserIsError} = useQuery({
    queryKey: ["loginUser"],
    queryFn: getMe,
    retry: (failureCount, error : any) => {
      if(error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5,
    enabled : isSignin()
  })

  if(isError || isLoading) {console.error(error); return null;}

  return(
    <header className={styles.header}>
      <Wrapper className={styles.headerWrapper}>
        <DetailHero/>
        <DetailMetaBar/> 
      </Wrapper>
        {!loginUserLoading && !loginUserIsError && loginUser?.UUID === writingDetail?.authorUuid ? <Wrapper><WritingActions/></Wrapper> : <></>}
    </header>
  )
}