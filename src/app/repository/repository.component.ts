import { Component, OnInit } from '@angular/core';
import { Repository } from '../repository';
import { ApiService } from '../api.service';

import { Observable, Subject } from 'rxjs';
import { isEmpty } from 'rxjs/operators';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  repository$: Observable<Repository[]>;
  private searchTerms = new Subject<string>();

  constructor(private api: ApiService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.repository$ = this.api.searchRepository(term);
  }

  ngOnInit(): void {
    this.repository$ = this.api.getRepository();
  }

  getRepository(): void {
    this.repository$ = this.api.getRepository();
  }

}
