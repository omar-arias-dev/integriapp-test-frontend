import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { VehicleDto, VehicleUpdateDto } from '../dtos/vehicle.dto';

@Injectable({
    providedIn: 'root'
})
export class VehicleApiService {

    constructor(private api: ApiService) { }

    getVehicles(
        skip = 0,
        limit = 10,
        activeOnly = false
    ): Observable<VehicleDto[]> {
        return this.api.get<VehicleDto[]>(
            `/api/vehicles/?skip=${skip}&limit=${limit}&active_only=${activeOnly}`
        );
    }

    findById(id: number): Observable<any> {
        return this.api.get(`/api/vehicles/${id}`);
    }

    update(id: number, payload: VehicleUpdateDto): Observable<any> {
        return this.api.put(`/api/vehicles/${id}`, payload);
    }

    create(payload: VehicleUpdateDto): Observable<any> {
        return this.api.post('/api/vehicles', payload);
    }

    deactivate(id: number): Observable<void> {
        return this.api.patch<void>(`/api/vehicles/${id}/deactivate`, {});
    }

}
