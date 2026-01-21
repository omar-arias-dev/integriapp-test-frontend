export interface RouteDto {
  id: number;
  vehicle_id: number;
  origin: string;
  destination: string;
  status: 'assigned' | 'in_progress' | 'completed';
  assigned_at: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string | null;
}
