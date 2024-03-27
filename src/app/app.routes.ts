import { Routes } from '@angular/router';
import { FilmListComponent } from './film-card/film-card.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { HomeComponent } from './home/home.component';
import { EditFilmComponent } from './edit-film/edit-film.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "products", component: FilmListComponent },
    { path: "add", component: AddFilmComponent },
    { path: "edit/:id", component: EditFilmComponent}
];