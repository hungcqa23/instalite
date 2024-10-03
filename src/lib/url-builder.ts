export class Url {
  private hash: string = '';
  private search: string = '';
  private page: number = 1;
  private take: number = 10;
  private isQuery: boolean = true;
  private pathname: string = '';

  constructor(pathname: string, search: string, page: number, limit: number, hash: string) {
    this.pathname = pathname;
    this.search = search;
    this.page = page;
    this.take = limit;
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
    if (this.pathname) {
      url += `${this.pathname}`;
    }
    if (this.isQuery) {
      url += '?';
    }
    if (this.search) {
      url += `${this.search}`;
    }
    if (this.page) {
      url += `page=${this.page}`;
    }
    if (this.take) {
      url += `&take=${this.take}`;
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
  private pathname: string = '';
  private page: number = 1;
  private take: number = 10;
  private search: string = '';
  private hash: string = '';

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
    return this;
  }

  setLimit(limit: number) {
    this.take = limit;
    return this;
  }

  setPathname(pathname: string) {
    this.pathname = pathname;
    return this;
  }

  build() {
    return new Url(this.pathname, this.search, this.page, this.take, this.hash);
  }
}
