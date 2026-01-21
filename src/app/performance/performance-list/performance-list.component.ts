import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { Performance } from '../../models/performance.model';

@Component({
  selector: 'app-performances-list',
  templateUrl: './performance-list.component.html',
})
export class PerformancesListComponent implements OnInit {

  performances: Performance[] = [];

  skip = 0;
  limit = 10;

  constructor(private performanceService: PerformanceService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.performanceService
      .getPerformances(this.skip, this.limit)
      .subscribe(data => this.performances = data);
  }

  siguiente(): void {
    this.skip += this.limit;
    this.cargar();
  }

  anterior(): void {
    if (this.skip === 0) return;
    this.skip -= this.limit;
    this.cargar();
  }

  puedeIrAtras(): boolean {
    return this.skip > 0;
  }

  getFechaFinal(performance: Performance): Date {
    const inicio = new Date(performance.createdAt);
    const minutos = performance.duration ?? 0;

    return new Date(inicio.getTime() + minutos * 60000);
  }

}
