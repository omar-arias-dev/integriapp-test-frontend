import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerformancesListComponent } from './performance-list/performance-list.component';

const routes: Routes = [
    { path: '', component: PerformancesListComponent }
];

@NgModule({
    declarations: [
        PerformancesListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class PerformancesModule { }
