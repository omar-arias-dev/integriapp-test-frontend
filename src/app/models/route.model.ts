export interface Route {
  id: number;
  vehicleId: number;
  origin: string;
  destination: string;
  status: string;
  assignedAt: Date;
  startedAt?: Date | null;
  completedAt?: Date | null;
  createdAt: Date;
}
