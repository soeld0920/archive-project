export type Page = {
  id : string;
  title : string;
  date : string;
  tags : string[];
  seriesId : string;
  seriesNum : number;
}

export type Series = {
  id : string;
  category : PageCategory;
  title : string;
  pages : Page[];
}

export type PageCategory = "Basic" | "Python" | "C" | "Java" | "React" | "Node.js" | "Github" | "Algorithm"