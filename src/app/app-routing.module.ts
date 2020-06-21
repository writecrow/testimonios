import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoryComponent } from './repository/repository.component';
import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/testimonios', pathMatch: 'full' },
  { path: 'testimonios', component: RepositoryComponent },
  { path: 'testimonio/:path', component: RepositoryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
