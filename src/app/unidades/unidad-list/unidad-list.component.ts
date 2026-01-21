import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Unidad } from '../../models/unidad.model';
import { UnidadService } from '../../services/unidad.service';

@Component({
  selector: 'app-unidad-list',
  templateUrl: './unidad-list.component.html',
  styleUrls: ['./unidad-list.component.css']
})
export class UnidadListComponent implements OnInit, OnDestroy {
  unidades: Unidad[] = [];
  private subscription?: Subscription;
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' = 'success';
  loading = false;

  constructor(
    private unidadService: UnidadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.unidadService
      .getUnidades()
      .subscribe({
        next: unidades => {
          this.unidades = unidades;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    this.unidadService.loadUnidades();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  crearUnidad(): void {
    this.router.navigate(['/unidades/nuevo']);
  }

  editarUnidad(id: number): void {
    this.router.navigate(['/unidades/editar', id]);
  }

  eliminarUnidad(id: number): void {
    if (!confirm('¿Está seguro de que desea eliminar esta unidad?')) {
      return;
    }

    this.unidadService.desactivarUnidad(id).subscribe({
      next: () => {
        this.mostrarMensaje('Unidad desactivada correctamente', 'success');
      },
      error: () => {
        this.mostrarMensaje('Error al desactivar la unidad', 'danger');
      }
    });
  }


  private mostrarMensaje(mensaje: string, tipo: 'success' | 'danger'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  siguiente(): void {
    this.unidadService.nextPage();
  }

  puedeIrAdelante(): boolean {
    return this.unidades.length === 10;
  }

  anterior(): void {
    this.unidadService.prevPage();
  }

  puedeIrAtras(): boolean {
    return this.unidadService.canGoBack();
  }
}
