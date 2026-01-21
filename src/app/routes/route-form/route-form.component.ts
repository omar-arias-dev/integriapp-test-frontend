import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { VehicleApiService } from '../../services/vehicle.service';
import { VehicleDto } from '../../dtos/vehicle.dto';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css'],
})
export class RouteFormComponent implements OnInit {

  routeForm: FormGroup;
  vehicles: VehicleDto[] = [];
  mensaje = '';
  tipoMensaje: 'success' | 'danger' = 'success';

  constructor(
    private fb: FormBuilder,
    private routeService: RouteService,
    private vehicleService: VehicleApiService,
    private router: Router
  ) {
    this.routeForm = this.fb.group({
      vehicle_id: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.vehicleService
      .getVehicles(0, 100, true)
      .subscribe(v => this.vehicles = v);
  }

  guardar(): void {
    if (this.routeForm.invalid) {
      this.routeForm.markAllAsTouched();
      return;
    }

    this.routeService.createRoute(this.routeForm.value).subscribe({
      next: () => {
        this.mostrarMensaje('Ruta creada correctamente', 'success');
        setTimeout(() => this.router.navigate(['/routes']), 1500);
      },
      error: () => {
        this.mostrarMensaje('Error al crear la ruta', 'danger');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/routes']);
  }

  private mostrarMensaje(msg: string, tipo: 'success' | 'danger') {
    this.mensaje = msg;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 3000);
  }
}
