import { Component, EventEmitter, Output } from '@angular/core';
import { Filtro } from '../interfaces/ruta';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
 @Output() filtersApplied = new EventEmitter<Filtro>();


  tipoOptions: string[] = ['A pie', 'Tuk Tuk']
  preferenciasOptions: string[] = ['Patios', 'Cristiano', 'Gastronomía', 'Mezquita', 'Yacimiento arqueológico', 'Judería'];


  selectedPreferences: string[] = [];


  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.filterForm = this.fb.group({
      tipo: [''],
      precioMax: [200],
      duracionMin: [0],
      duracionMax: [300]

    });
  }


  onPrefChange(pref: string, event: MatCheckboxChange): void {
    if (event.checked) {

      this.selectedPreferences.push(pref);
    } else {

      const index = this.selectedPreferences.indexOf(pref);
      if (index > -1) {
        this.selectedPreferences.splice(index, 1);
      }
    }
  }


  onApplyFilters(): void {
    const filtros: Filtro = {
      ...this.filterForm.value,
      preferencias: this.selectedPreferences
    };
    console.log('Filtros aplicados:', filtros);
    this.filtersApplied.emit(filtros);
  }
}
