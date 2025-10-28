import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { TextStyles } from "styles/TextStyles";
import { Colors } from "styles/Colors";
import { Layouts } from "styles/Layouts";
import Header from "components/layout/Header";
import Home from "pages/Home";
import Search from "pages/Search";
import "App.css"
import WritingDetail from "pages/WritingDetail";
import { fetchWritingByParams } from "lib/getWritingByParams";
import { fetchLoginUserByParams } from "lib/getUserByParams";
import fetchUser from "backend/User/fetchUser";
import fetchSeries from "backend/Series/fetchSeries";
import type { Series, Writing, WritingIndex } from "types/Writing";
import type { User } from "types/User";
import { toWritingGlobKey, WRITING_CONTENT_MODULES } from "lib/normalizeToGlobKey";
import { lazy } from "react";

type WritingDetailLoderData = {
  writing : Writing
  author : User
  WritingContent : React.LazyExoticComponent<React.ComponentType<any>>
  seriesPayload? : {series : Series, writingIndexs : WritingIndex[]}
}

async function writingLoader(request : Request) : Promise<WritingDetailLoderData>{
  const searchParams = new URL(request.url).searchParams
  const writing = await fetchWritingByParams(searchParams);
  const authorP = await fetchUser(writing.authorUUID);
  const WritingContent = getWritingContent(writing.URL)
  if(!WritingContent) throw new Error("Not Content")
  if(writing.formType === "series"){
    const seriesP = await fetchSeries(writing.seriesUUID || null)
    const [author, series] = await Promise.all([authorP, seriesP])
    return {writing : writing, author : author, WritingContent : WritingContent , seriesPayload : {series : series.series, writingIndexs : series.writingIndexs}}
  }
  else {
    const author = await authorP
    return {writing : writing, author : author,  WritingContent : WritingContent}
  }
}

function getWritingContent(URL : string){
  const key = toWritingGlobKey(URL);
  if(!key) return null;

  const loader = WRITING_CONTENT_MODULES[key]; // () => Promise<Module>
  if (!loader) return null;

  // React.lazy 래핑
  return lazy(async () => {
    const mod = (await loader()) as { default: React.ComponentType<any> };
    return { default: mod.default };
  });
}

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
          shouldRevalidate : ({currentUrl, nextUrl}) => nextUrl.search !== currentUrl.search
          
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
    <RouterProvider router={router}/>
  );
}

function Layout(){
  return(
    <>
      <TextStyles/><Colors/><Layouts/><TextStyles/>
      <Header/>
      <Outlet/>
    </>
  )
}