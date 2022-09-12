import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Books } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) { }

  // Get all books ordered by title
  getBooks() {
    return this.http.get<Books[]>(`${environment.apiUrl}/books/`);
  }

}

