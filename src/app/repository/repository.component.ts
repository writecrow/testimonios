import { Component, OnInit } from '@angular/core';
import { Repository } from '../repository';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  repository: Repository[];
  selectedRepository: Repository;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getRepository();
  }

  getRepository(): void {
    this.repository = this.api.getRepository();
  }

}
