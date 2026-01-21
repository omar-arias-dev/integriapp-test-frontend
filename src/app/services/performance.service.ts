import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { PerformanceDto } from '../dtos/performance.dto';
import { Performance } from '../models/performance.model';
import { PerformanceMapper } from '../mappers/performance.mapper';

@Injectable({ providedIn: 'root' })
export class PerformanceService {

    constructor(private api: ApiService) { }

    getPerformances(skip = 0, limit = 10): Observable<Performance[]> {
        return this.api
            .get<PerformanceDto[]>(`/api/performances/?skip=${skip}&limit=${limit}`)
            .pipe(
                map(dtos => dtos.map(PerformanceMapper.toPerformance))
            );
    }
}
