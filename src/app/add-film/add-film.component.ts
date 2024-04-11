import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryModel, CompanyModel, CreateFilmModel, FilmModel } from '../services/films';
import { FilmService } from '../services/FilmService';
import { MatIconModule } from '@angular/material/icon';

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
  templateUrl: './add-film.component.html',
  styleUrl: './add-film.component.css'
})
export class AddFilmComponent {
  @Input() product: FilmModel | null = null;
  form: FormGroup;
  categories: CategoryModel[] = [];
  companies: CompanyModel[] = [];
  constructor(private fb: FormBuilder,
    private service: FilmService,
    private location: Location) { 
      this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: [0, [Validators.required, Validators.minLength(1)]],
      companyId: [0, [Validators.required, Validators.minLength(1)]],
      year: [0, [Validators.required, Validators.maxLength(Date.now())]],
      imageUrl: ['', [Validators.required]]
    });}

    ngOnInit(): void {
      this.service.getCompanies().subscribe(res => this.companies = res);
      this.service.getCategories().subscribe(res => this.categories = res);
    }

    onSubmit(): void {
      if (!this.form.valid) {
        alert("Invalid data, please try again!");
        return;
      }

    const item: CreateFilmModel = this.form.value as CreateFilmModel;
       this.service.create(item).subscribe(res => {
         console.log(res);

        this.back();
      });
    }

    back(): void {
      this.location.back();
    }
}