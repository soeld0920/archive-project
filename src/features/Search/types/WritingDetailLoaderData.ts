import type { User } from "types/User"
import type { Series, Writing, WritingIndex } from "types/Writing"

export type WritingDetailLoaderData = {
  writing : Writing
  author : User
  WritingContent : React.LazyExoticComponent<React.ComponentType<any>>
  seriesPayload? : {series : Series, writingIndexs : WritingIndex[]}
  currentUser : User
  commentContent : {user : User, content : string, date : string}[]
}