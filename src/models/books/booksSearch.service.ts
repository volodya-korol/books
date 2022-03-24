import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Book } from './entities/book.entity';
import { BookSearchBody, BookSearchResult } from './types/book-search-result.type';

@Injectable()
export default class BooksSearchService {
  readonly index = 'books';
  constructor(private readonly elasticSearchService: ElasticsearchService) {}

  async indexBook(book: Book) {
    const { id, name, hashTags } = book;
    return this.elasticSearchService.index<BookSearchBody>({
      index: this.index,
      body: {
        id,
        name,
        hashTags,
      },
    });
  }

  async searchBooks(text: string) {
    const { body } = await this.elasticSearchService.search<BookSearchResult>({
      index: this.index,
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  name: {
                    query: text,
                    operator: 'and',
                    fuzziness: 'auto',
                  },
                },
              },
              {
                wildcard: {
                  name: {
                    value: '*' + text + '*',
                    boost: 1.0,
                    rewrite: 'constant_score',
                  },
                },
              },
            ],
          },
        },
        suggest: {
          text: text,
          result: {
            phrase: {
              field: 'name',
              size: 2,
              gram_size: 1,
              direct_generator: [
                {
                  field: 'name',
                  suggest_mode: 'always',
                },
              ],
              highlight: {
                pre_tag: '<em>',
                post_tag: '</em>',
              },
            },
          },
        },
      },
    });
    return { result: body.hits.hits.map((item) => item._source), suggest: body.suggest.result[0] };
  }
  async searchHashTags(text: string) {
    const { body } = await this.elasticSearchService.search<BookSearchResult>({
      index: this.index,
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  hashTags: {
                    query: text,
                    operator: 'and',
                    fuzziness: 'auto',
                  },
                },
              },
              {
                wildcard: {
                  hashTags: {
                    value: '*' + text + '*',
                    boost: 1.0,
                    rewrite: 'constant_score',
                  },
                },
              },
            ],
          },
        },
        suggest: {
          text: text,
          result: {
            phrase: {
              field: 'hashTags',
              size: 2,
              gram_size: 1,
              direct_generator: [
                {
                  field: 'hashTags',
                  suggest_mode: 'always',
                },
              ],
              highlight: {
                pre_tag: '<em>',
                post_tag: '</em>',
              },
            },
          },
        },
      },
    });
    return { result: body.hits.hits.map((item) => item._source), suggest: body.suggest.result[0] };
  }

  async delete(bookId: number) {
    this.elasticSearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: bookId,
          },
        },
      },
    });
  }
}
