import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilmService } from '../services/FilmService';
import { CategoryModel, CompanyModel, FilmModel } from '../services/films';
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
  
  form: FormGroup;
  id: number = 0;
  film: FilmModel | null = null;
  categories: CategoryModel[] = [];
  companies: CompanyModel[] = [];
  constructor(private fb: FormBuilder,
    private service: FilmService,
    private location: Location,
    private route: ActivatedRoute) { 
      this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: [0, [Validators.required, Validators.minLength(1)]],
      companyId: [0, [Validators.required, Validators.minLength(1)]],
      year: [0, [Validators.required, Validators.maxLength(Date.now())]],
      imageUrl: ['', [Validators.required]]
    });} 


  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.service.getCategories().subscribe(res => this.categories = res);
  
    this.service.get(this.id).subscribe(res => {
      console.log(res);
  
      this.film = res;
      this.form.setValue(res);
    });
  }  
  onSubmit(): void {
    if (!this.form.valid) return;

    const item = this.form.value as FilmModel;
    this.service.edit(item).subscribe();
  }

  back(): void {
    this.location.back();
  }

  onCancel() {
    if (this.film)
      this.form.setValue(this.film);
  }
}