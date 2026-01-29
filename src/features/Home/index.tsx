import Wrapper from "shared/components/blocks/Wrapper";
import UserProfileCard from "shared/components/features/UserProfileInfo";
import PageHeader from "shared/components/features/PageHeader";
import { MdHome } from "react-icons/md";

export default function HomePage(){
  return (
    <main>
      <PageHeader icon={<MdHome />} title="Home" />
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