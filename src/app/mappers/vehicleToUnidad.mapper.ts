import { Unidad } from '../models/unidad.model';
import { VehicleDto, VehicleUpdateDto } from '../dtos/vehicle.dto';

export class VehicleMapper {
    static toUnidad(vehicle: VehicleDto): Unidad {
        return {
            id: vehicle.id,
            placa: vehicle.plate_number,
            marca: vehicle.brand,
            modelo: vehicle.model,
            anio: vehicle.year,
            usuarioId: vehicle.user_id,
            fechaCreacion: new Date(vehicle.created_at)
        };
    }

    static toVehiclePayload(unidad: Partial<Unidad>) {
        return {
            plate_number: unidad.placa,
            brand: unidad.marca,
            model: unidad.modelo,
            year: unidad.anio,
            user_id: unidad.usuarioId
        };
    }

    static toUpdateDto(unidad: Partial<Unidad>): VehicleUpdateDto {
        return {
            user_id: unidad.usuarioId!,
            plate_number: unidad.placa!,
            brand: unidad.marca!,
            model: unidad.modelo!,
            year: unidad.anio!,
            is_active: true
        };
    }
}

