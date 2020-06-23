import { Component, OnInit } from '@angular/core';
import { Facet, Repository } from '../repository';
import { ApiService } from '../api.service';

import { Observable, Subject, Subscription, of } from 'rxjs';
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

  repository: Repository[];
  original: Repository[];
  public searchInput: '';
  private searchTerms = new Subject<string>();
  selectedCategories: Facet[];
  public categories = [
    {
      name: 'Book',
      checked: false,
    },
    {
      name: 'Dissertation',
      checked: false,
    },
    {
      name: 'Lecture',
      checked: false,
    }
  ];
  public topics = [
    {
      name: 'Critical Pedagogy',
      checked: false,
    },
    {
      name: 'History',
      checked: false,
    },
    {
      name: 'Undocumented',
      checked: false,
    }
  ];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    const repoObservable = this.api.getRepository();
    repoObservable.subscribe((data: Repository[]) => {
      this.repository = data;
      this.original = data;
    });
  }

  reset() {
    this.repository = this.original;
    for (const f of this.categories) {
      f.checked = false;
    }
    this.searchInput = '';
  }

  // Push a search term into the observable stream.
  textSearch(term: string): void {
    this.repository = this.search(term, this.categories, this.topics);
  }

  facetSearch(term: string, type: string, title: string): void {
    if (type === 'category') {
      for (const f of this.categories) {
        if (f.name === title) {
          // Update the facet explicitly.
          f.checked = !f.checked;
        }
      }
    }
    else if (type === 'topics') {
      for (const t of this.topics) {
        if (t.name === title) {
          // Update the facet explicitly.
          t.checked = !t.checked;
        }
      }
    }
    this.repository = this.search(term, this.categories, this.topics);
  }

  categoryFilter(item: Repository, categories: Facet[]): boolean {
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

  topicFilter(item: Repository, topics: Facet[]): boolean {
    const selectedFacets = [];
    for (const i of topics) {
      if (i.checked) {
        selectedFacets.push(i.name);
      }
    }
    if (selectedFacets.length === 0) {
      return true;
    }
    return (
      selectedFacets.includes(item.topics)
    );
  }

  termFilter(item: Repository, term: string) {
    const match = term.toLowerCase();
    const result = item.title.toLowerCase().includes(match) ||
      item.summary.toLowerCase().includes(match) ||
      item.author.toLowerCase().includes(match) ||
      term === null;
    return result;
  }

  search(term, categories, topics): Repository[] {
    return this.original.filter(item =>
      this.categoryFilter(item, categories) &&
      this.topicFilter(item, topics) &&
      this.termFilter(item, term)
    );
  }

}
