import Wrapper from "shared/components/blocks/Wrapper";
import UserProfileCard from "shared/components/features/UserProfileInfo";

export default function HomePage(){
  return (
    <main>
      <Wrapper>
        {/* <PopularSection/>
        <Recommand/> */}
        <aside style={{width : "450px"}}>
          <UserProfileCard/>
        </aside>
      </Wrapper>
    </main>
  )
}