import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Facet, Repository } from './repository';
import { repo } from './mock-repository';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getRepository(): Observable<Repository[]> {
    return of(repo);
  }

  getDetail(path: string): Observable<Repository> {
    console.log(repo);
    return of(repo.find(item => item.path === path));
  }

  searchRepository(term: string, categories: Facet[]): Observable<Repository[]> {
    if (term == null || !term.trim()) {
      // if not search term, return facet matches.
      return of(repo.filter(item =>
        this.categoryFilter(item, categories)
      ));
    }
    return of(repo.filter(item =>
      this.termFilter(item, term) &&
      this.categoryFilter(item, categories)
    ));
  }

  termFilter(item: Repository, term: string) {
    return (
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      item.summary.toLowerCase().includes(term.toLowerCase())
    );
  }

  categoryFilter(item: Repository, categories: Facet[]) {
    const selectedFacets = [];
    for (const i of categories) {
      if (i.checked) {
        selectedFacets.push(i.name);
      }
    }
    if (selectedFacets.length === 0) {
      return true;
    }
    return (
      selectedFacets.includes(item.category)
    );
  }
}
