export type Category = 'Algorithm' | 'Wrong' | 'Dictionary';

export interface BaseNote{
  id : string;
  title : string;
  createAt : string;
}

export interface AlgorithmNote extends BaseNote{
  category : 'Algorithm';
  topic : string;
}

export interface WrongNote extends BaseNote{
  category : 'Wrong';
  problemTitle : string;
  problemLink : string;
  difficulty : 1 | 2 | 3 | 4 | 5;
}

export interface DictionaryNote extends BaseNote{
  category : 'Dictionary';
  language : "Java" | "FrontEnd" | "BackEnd" | "Etc";
}

export type Note = AlgorithmNote | WrongNote | DictionaryNote;