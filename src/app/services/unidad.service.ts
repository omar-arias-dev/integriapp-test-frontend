import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Unidad } from '../models/unidad.model';
import { UsuarioService } from './usuario.service';
import { VehicleApiService } from './vehicle.service';
import { VehicleMapper } from '../mappers/vehicleToUnidad.mapper';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private unidades: Unidad[] = [];
  private unidadesSubject = new BehaviorSubject<Unidad[]>([]);
  public unidades$ = this.unidadesSubject.asObservable();
  private skip = 0;
  private limit = 10;

  constructor(
    private vehicleApi: VehicleApiService,
    private usuarioService: UsuarioService,
  ) {
    // Inicializar con algunos datos de ejemplo
    this.loadInitialData();
  }

  loadUnidades(activeOnly = true): void {
    this.vehicleApi
      .getVehicles(this.skip, this.limit, activeOnly)
      .pipe(
        map(vehicles => vehicles.map(VehicleMapper.toUnidad)),
        tap(unidades => this.unidadesSubject.next(unidades))
      )
      .subscribe();
  }

  nextPage(activeOnly = true): void {
    this.skip += this.limit;
    this.loadUnidades(activeOnly);
  }

  prevPage(): void {
    if (this.skip === 0) return;
    this.skip -= this.limit;
    this.loadUnidades();
  }

  canGoBack(): boolean {
    return this.skip > 0;
  }

  private loadInitialData(): void {
    const initialData: Unidad[] = [];
    this.unidades = initialData;
    this.unidadesSubject.next([...this.unidades]);
  }

  getUnidades(): Observable<Unidad[]> {
    return combineLatest([
      this.unidades$,
      this.usuarioService.usuarios$
    ]).pipe(
      map(([unidades, usuarios]) => {
        return unidades.map(unidad => ({
          ...unidad,
          usuario: usuarios.find(u => u.id === unidad.usuarioId)
        }));
      })
    );
  }

  getUnidadById(id: number): Observable<Unidad> {
    return this.vehicleApi.findById(id).pipe(
      map(vehicle => VehicleMapper.toUnidad(vehicle))
    );
  }

  crearUnidad(unidad: Partial<Unidad>): Observable<void> {
    const payload = VehicleMapper.toUpdateDto(unidad);

    return this.vehicleApi.create(payload).pipe(
      tap(() => {
        this.loadUnidades();
      }),
      map(() => void 0)
    );
  }

  actualizarUnidad(id: number, unidad: Partial<Unidad>): Observable<void> {
    const payload = VehicleMapper.toUpdateDto(unidad);
    return this.vehicleApi.update(id, payload).pipe(
      tap(() => {
        this.loadUnidades();
      }),
      map(() => void 0)
    );
  }

  eliminarUnidad(id: number): boolean {
    const index = this.unidades.findIndex(u => u.id === id);
    if (index === -1) {
      return false;
    }
    this.unidades.splice(index, 1);
    this.unidadesSubject.next([...this.unidades]);
    return true;
  }

  desactivarUnidad(id: number): Observable<void> {
    return this.vehicleApi.deactivate(id).pipe(
      tap(() => {
        const nuevasUnidades = this.unidadesSubject.value.filter(
          unidad => unidad.id !== id
        );
        this.unidadesSubject.next(nuevasUnidades);
      })
    );
  }

}
