import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-route-complete',
  templateUrl: './route-complete.component.html'
})
export class RouteCompleteComponent implements OnInit {

  @Input() routeId!: number;
  @Output() completed = new EventEmitter<void>();

  completeForm!: FormGroup;
  mensaje = '';
  tipoMensaje: 'success' | 'danger' | null = null;

  constructor(
    private fb: FormBuilder,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.completeForm = this.fb.group({
      distance_km: [null, [Validators.required, Validators.min(1)]],
      fuel_consumed: [null, [Validators.required, Validators.min(1)]],
      duration_minutes: [null, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  completar(): void {
    if (this.completeForm.invalid) {
      this.completeForm.markAllAsTouched();
      return;
    }

    this.routeService
      .completeRoute(this.routeId, this.completeForm.value)
      .subscribe({
        next: () => {
          this.mensaje = 'Ruta completada correctamente';
          this.tipoMensaje = 'success';
          this.completeForm.reset();
          this.completed.emit();
        },
        error: () => {
          this.mensaje = 'Error al completar la ruta';
          this.tipoMensaje = 'danger';
        }
      });
  }
}
