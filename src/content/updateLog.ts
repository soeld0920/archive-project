export type Update = {
  version : string;
  patch : string[];
  date : string;
  title ? :string;
}

export const log : Update[] = [
  {
    version : "sample",
    patch : ["샘플용 글입니다.","12345678901234567890123456789012345678901234567890123456789012345678901234567890","감사합니다"],
    date : "25.09.03",
    title : "sample"
  },
  {
    version : "V S.A.M.",
    patch : ["샘플용 글입니다.","가나다라마바사아자카타파하","감사합니다"],
    date : "25.09.03"
  },
]