export interface QuizResult {
  scores: {
    engineering: number;
    medicine: number;
    arts: number;
    commerce: number;
  };
  result: string;
}