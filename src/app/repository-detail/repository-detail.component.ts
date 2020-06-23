import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../repository';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.css']
})
export class RepositoryDetailComponent implements OnInit {
  item: Repository;

  @Input() selectedRepository: Repository;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(): void {
    const path = this.route.snapshot.paramMap.get('path');
    this.api.getDetail(path)
      .subscribe(item => this.item = item);
  }

goBack(): void {
  this.location.back();
}

}
