import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapaService } from '../../servicios/mapa.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroNegocioDTO } from '../../dto/registroNegocioDTO';


@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent implements OnInit {
  
  registroNegocioDTO: RegistroNegocioDTO;
  horariosForm: FormGroup;

  constructor(private mapaService: MapaService, private fb: FormBuilder) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horariosForm = this.fb.group({
      horarios: this.fb.array([])
    });
   }

  ngOnInit(): void {

    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }

  get horarios(): FormArray {
    return this.horariosForm.get('horarios') as FormArray;
  }

  agregarHorario(): void {
    this.horarios.push(this.fb.group({
      dia: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]
    }));
  }

  eliminarHorario(index: number): void {
    this.horarios.removeAt(index);
  }
}
