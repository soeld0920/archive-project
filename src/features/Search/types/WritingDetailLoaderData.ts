import type { User } from "shared/types/User"
import type { Series, Writing, WritingIndex } from "shared/types/Writing"

export type WritingDetailLoaderData = {
  writing : Writing
  author : User
  WritingContent : React.LazyExoticComponent<React.ComponentType<any>>
  seriesPayload? : {series : Series, writingIndexs : WritingIndex[]}
  currentUser : User
  commentContent : {user : User, content : string, date : string}[]
}