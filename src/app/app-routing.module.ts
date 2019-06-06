import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { ListComponent } from './componentes/list/list.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'listar', component: ListComponent },
  { path: '**', component: HomeComponent },
  // { path: 'path3', component: Name3Component },
  // { path: 'path4', component: Name4Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }








