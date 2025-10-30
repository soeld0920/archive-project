import { createBrowserRouter, Outlet, RouterProvider, type ShouldRevalidateFunctionArgs } from "react-router-dom";
import { TextStyles } from "styles/TextStyles";
import { Colors } from "styles/Colors";
import { Layouts } from "styles/Layouts";
import Header from "components/layout/Header";
import Home from "pages/Home";
import Search from "pages/Search";
import "App.css"
import WritingDetail from "pages/WritingDetail";
import { fetchLoginUserByParams } from "lib/getUserByParams";
import writingLoader from "features/Detail/libs/writingLoader";
import writingShouldRevalidate from "features/Detail/libs/writingShouldRevalidate";
import { MessageProvider, useMessageContext } from "context/message";


const router = createBrowserRouter(
  [
    {
      path : "/",
      element : <Layout/>,
      id : "root",
      children : [
        {index : true, element : <Home/>},
        {path : "search/*",element : <Search/>},
        {
          path : "page", element : <WritingDetail/>,
          loader : ({request}) => writingLoader(request), 
          shouldRevalidate : writingShouldRevalidate
        }
      ],
      loader : async ({request}) => {const currentUser = await fetchLoginUserByParams(new URL(request.url).searchParams); return {currentUser : currentUser}},
      
    }
  ],
  {
    basename : "/archive-project" 
  }
)

export default function App() {
  return (
    <MessageProvider>
      <RouterProvider router={router}/>
    </MessageProvider>
  );
}

function Layout(){
  const [_,contextHolder] = useMessageContext()
  return(
    <>
      {contextHolder}
      <TextStyles/><Colors/><Layouts/>
      <Header/>
      <Outlet/>
    </>
  )
}