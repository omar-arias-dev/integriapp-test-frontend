import { RouteDto } from '../dtos/route.dto';
import { Route } from '../models/route.model';

export class RouteMapper {
  static toRoute(dto: RouteDto): Route {
    return {
      id: dto.id,
      vehicleId: dto.vehicle_id,
      origin: dto.origin,
      destination: dto.destination,
      status: dto.status,
      assignedAt: new Date(dto.assigned_at),
      startedAt: dto.started_at ? new Date(dto.started_at) : null,
      completedAt: dto.completed_at ? new Date(dto.completed_at) : null,
      createdAt: new Date(dto.created_at),
    };
  }
}
