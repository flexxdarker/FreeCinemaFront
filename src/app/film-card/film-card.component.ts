import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FilmModel } from '../services/films';
import { MatDialog } from '@angular/material/dialog';
import { FilmService } from '../services/FilmService';
import { Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.css'
})
export class FilmListComponent implements OnInit {
  displayedColumns: string[] = ["imageUrl", "id", "name"];
  films: FilmModel[] = [];
  tableSource = new MatTableDataSource<FilmModel>([]);

  constructor(private filmService: FilmService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filmService.getAll().subscribe(res => this.films = res);
  }

  onEdit(id: number): void {
    // open edit page
    this.router.navigate(["/edit", id]);
  }

  onDelete(id: number): void {
    // open confirmation dialog
    this.openConfirmDialog().afterClosed().subscribe(res => {
      if (res === true)
        this.filmService.delete(id).subscribe(res => {

          const index = this.films.findIndex(x => x.id === id);

          console.log(index);
          this.films.splice(index, 1);
          console.log(this.films);
          this.refreshTable();
        });
    });
  }
  
  openConfirmDialog() {
    return this.dialog.open(DeleteConfirmationDialogComponent);
  }
  
  refreshTable() {
    this.tableSource.data = this.films;
  }
}