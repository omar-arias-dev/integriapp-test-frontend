import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RouteDto } from '../dtos/route.dto';
import { Route } from '../models/route.model';
import { RouteMapper } from '../mappers/route.mapper';

@Injectable({ providedIn: 'root' })
export class RouteService {

    constructor(private api: ApiService) { }

    getRoutes(
        skip = 0,
        limit = 10,
        filters?: {
            status?: string;
            vehicleId?: number;
        }
    ): Observable<Route[]> {

        let query = `/api/routes/?skip=${skip}&limit=${limit}`;

        if (filters?.status) {
            query += `&status=${filters.status}`;
        }

        if (filters?.vehicleId) {
            query += `&vehicle_id=${filters.vehicleId}`;
        }

        return this.api
            .get<RouteDto[]>(query)
            .pipe(map(dtos => dtos.map(RouteMapper.toRoute)));
    }


    createRoute(data: {
        vehicle_id: number;
        origin: string;
        destination: string;
    }) {
        return this.api
            .post<RouteDto>('/api/routes/', data)
            .pipe(map(RouteMapper.toRoute));
    }

    updateStatusToInProgress(routeId: number): Observable<Route> {
        return this.api
            .put<RouteDto>(`/api/routes/${routeId}`, {
                status: 'in_progress'
            })
            .pipe(map(RouteMapper.toRoute));
    }

    completeRoute(
        routeId: number,
        data: {
            distance_km: number;
            fuel_consumed: number;
            duration_minutes: number;
            notes: string;
        }
    ): Observable<Route> {
        return this.api
            .patch<RouteDto>(`/api/routes/${routeId}/complete`, data)
            .pipe(map(RouteMapper.toRoute));
    }

}