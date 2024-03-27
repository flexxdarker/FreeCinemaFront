import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FilmModel } from '../services/films';
import { FilmService } from '../services/FilmService';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.css'
})
export class FilmListComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "price", "rating","imageUrl"];
  films: FilmModel[] = [];

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.getAll().subscribe(res => this.films = res.films);
  }
}