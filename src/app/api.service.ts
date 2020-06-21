import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Repository } from './repository';
import { repo } from './mock-repository';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getRepository(): Repository[] {
    return repo;
  }

  getDetail(path: string): Observable<Repository> {
    console.log(repo);
    return of(repo.find(item => item.path === path));
  }
}
