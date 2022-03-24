export type BookSearchBody = {
  id: number;
  name: string;
  hashTags: string[];
};

export type BookSearchResult = {
  hits: {
    total: number;
    hits: Array<{
      _source: BookSearchBody;
    }>;
  };
  suggest: {
    text: string;
    offset: number;
    length: number;
    result?: {
      text: string;
      highlighted: string;
      score: number;
    }[];
  };
};
