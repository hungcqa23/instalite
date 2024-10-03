export class Url {
  private hash: string = '';
  private search: string = '';
  private page: number = 1;
  private limit: number = 10;
  private isQuery: boolean = true;

  constructor(search: string, page: number, limit: number, hash: string) {
    this.search = search;
    this.page = page;
    this.limit = limit;
    this.hash = hash;
    // this.validate();
  }

  // validate() {
  //   if (!this.protocol || !this.hostname) {
  //     throw new Error('Must specify at least a ' + 'protocol and a hostname');
  //   }
  // }

  toString() {
    let url = '';
    if (this.isQuery) {
      url += '?';
    }
    if (this.search) {
      url += `${this.search}`;
    }
    if (this.page) {
      url += `page=${this.page}`;
    }
    if (this.limit) {
      url += `limit=${this.limit}`;
    }
    if (this.hash) {
      url += `hash=${this.hash}`;
    }
    if (this.hash !== '') {
      url += `#${this.hash}`;
    }
    return url;
  }
}

export class QueryBuilder {
  private hash: string = '';
  private search: string = '';
  private page: number = 1;
  private limit: number = 10;

  constructor() {}
  setSearch(search: string) {
    this.search = search;
  }

  setHash(hash: string) {
    this.hash = hash;
    return this;
  }

  setPage(page: number) {
    this.page = page;
  }

  setLimit(limit: number) {
    this.limit = limit;
  }

  build() {
    return new Url(this.search, this.page, this.limit, this.hash);
  }
}
