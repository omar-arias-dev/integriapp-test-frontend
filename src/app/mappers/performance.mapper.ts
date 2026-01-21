import { PerformanceDto } from '../dtos/performance.dto';
import { Performance } from '../models/performance.model';

export class PerformanceMapper {
    static toPerformance(dto: PerformanceDto): Performance {
        return {
            routeId: dto.route_id,
            distanceKm: dto.distance_km,
            fuelConsumed: dto.fuel_consumed,
            duration: dto.duration,
            notes: dto.notes,
            createdAt: new Date(dto.created_at),
        };
    }
}
