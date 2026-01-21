import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { RouteFormComponent } from './route-form/route-form.component';
import { RouteCompleteComponent } from './route-complete-form/route-complete.component';

const routes: Routes = [
  { path: '', component: RoutesListComponent, },
  { path: 'form', component: RouteFormComponent, },
  { path: 'complete-form', component: RouteCompleteComponent, },
];

@NgModule({
  declarations: [
    RoutesListComponent,
    RouteFormComponent,
    RouteCompleteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RoutesModule { }
