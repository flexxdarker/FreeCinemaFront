import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilmService } from '../services/FilmService';
import { FilmModel } from '../services/films';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './edit-film.component.html',
  styleUrl: './edit-film.component.css'
})
export class EditFilmComponent {
  form = this.fb.group({
    name: [''],
    description: [''],
    categoryId: [0],
    companyId: [0],
    year: [0],
    imageUrl: ['']
  });

  constructor(private fb: FormBuilder,
    private service: FilmService,
    private location: Location) { }

  onSubmit(): void {
    if (!this.form.valid) return;

    const item = this.form.value as FilmModel;
    this.service.create(item);
  }

  back(): void {
    this.location.back();
  }
}