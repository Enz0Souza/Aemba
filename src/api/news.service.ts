import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private apiUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:10000/news'
      : 'https://api-aemba.onrender.com/news';

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

  deleteNews(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
