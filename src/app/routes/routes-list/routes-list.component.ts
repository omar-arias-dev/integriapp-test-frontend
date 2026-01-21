import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { Route } from '../../models/route.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-routes-list',
    templateUrl: './routes-list.component.html',
    styleUrls: ['./routes-list.component.css'],
})
export class RoutesListComponent implements OnInit {

    routes: Route[] = [];

    skip = 0;
    limit = 10;

    statusFilter: string = '';
    vehicleFilter: number | null = null;

    routeSeleccionada: number | null = null;


    constructor(
        private router: Router,
        private routeService: RouteService,
    ) { }

    ngOnInit(): void {
        this.cargarRutas();
    }

    cargarRutas(): void {
        this.routeService.getRoutes(
            this.skip,
            this.limit,
            {
                status: this.statusFilter || undefined,
                vehicleId: this.vehicleFilter || undefined,
            }
        ).subscribe(routes => {
            this.routes = routes;
        });
    }


    siguiente(): void {
        this.skip += this.limit;
        this.cargarRutas();
    }

    anterior(): void {
        if (this.skip === 0) return;
        this.skip -= this.limit;
        this.cargarRutas();
    }

    puedeIrAtras(): boolean {
        return this.skip > 0;
    }

    createRoute() {
        this.router.navigate(['/routes/form']);
    }

    cambiarStatus(route: Route): void {

        if (route.status === 'completed') {
            return;
        }

        if (route.status === 'assigned') {
            const confirmar = confirm('¿Deseas iniciar esta ruta?');
            if (!confirmar) return;

            this.routeService.updateStatusToInProgress(route.id)
                .subscribe(() => this.cargarRutas());
        }

        if (route.status === 'in_progress') {
            const confirmar = confirm('¿Deseas marcar esta ruta como completada?');
            if (!confirmar) return;

            this.routeService.completeRoute(route.id, {
                distance_km: 10,
                fuel_consumed: 10,
                duration_minutes: 10,
                notes: 'Finalizada desde listado'
            }).subscribe(() => this.cargarRutas());
        }
    }

    aplicarFiltros(): void {
        this.skip = 0;
        this.cargarRutas();
    }

    limpiarFiltros(): void {
        this.statusFilter = '';
        this.vehicleFilter = null;
        this.skip = 0;
        this.cargarRutas();
    }

    onRutaCompletada(): void {
        this.routeSeleccionada = null;
        this.cargarRutas();
    }

}
