export interface FilmModel {
    id: number;
    name: string;
    categoryId: number;
    catogoryName: string;
    companyId: number;
    companyName: string;
    imageUrl: string;
    year: number;
}

export interface CreateFilmModel {
    name: string;
    categoryId: number;
    companyId: number;
    year: number;
    imageUrl: string;
}

export interface CategoryModel{
    id:number;
    name: string;
}
export interface CompanyModel{
    id: number;
    name: string;
    date: Date;
}