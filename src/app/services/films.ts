export interface FilmModel {
    id: number;
    name: string;
    categoryId: number;
    imageUrl: string;
    year: number;
}

export interface FilmResponseModel {
    films: FilmModel[];
    limit: number;
    skip: number;
    total: number;
}