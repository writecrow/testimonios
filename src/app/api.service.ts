import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Repository } from './repository';
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

  searchRepository(term: string): Observable<Repository[]> {
    if (term == null || !term.trim()) {
      // if not search term, return empty array.
      return of(repo);
    }
    return of(repo.filter(item =>
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      item.summary.toLowerCase().includes(term.toLowerCase())
    ));
  }
}
