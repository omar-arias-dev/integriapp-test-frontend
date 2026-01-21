export interface VehicleDto {
  id: number;
  user_id: number;
  plate_number: string;
  brand: string;
  model: string;
  year: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface VehicleUpdateDto {
  user_id: number;
  plate_number: string;
  brand: string;
  model: string;
  year: number;
  is_active: boolean;
}
