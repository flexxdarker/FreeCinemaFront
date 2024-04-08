import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  form = this.fb.group({
    name: [''],
    description: [''],
    categoryId: [0],
    companyId: [0],
    year: [0],
    imageUrl: ['']
  });

  @Input() product: FilmModel | null = null;
  categories: CategoryModel[] = [];
  companies: CompanyModel[] = [];
  constructor(private fb: FormBuilder,
    private service: FilmService,
    private location: Location) { }

    ngOnInit(): void {
      this.service.getCategories().subscribe(res => this.categories = res);
      this.service.getCompanies().subscribe(res => this.categories = res);
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