import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private apiUrl = 'http://localhost:3000/news';

  constructor(private http: HttpClient) {}

  addNews(newsData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, newsData);
  }

  getNews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getNewsById(id: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}


  deleteNews(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${slug}`);
  }
}
