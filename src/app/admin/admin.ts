import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Paragraph {
  text: string;
  images?: string[];
}

interface News {
  id: number;
  title: string;
  subtitle: string;
  cover?: string;
  paragraphs: Paragraph[];
  useCarousel: boolean;
  date: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {
  newsList: News[] = [];
  apiUrl = 'http://localhost:3000/news';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.http.get<News[]>(this.apiUrl).subscribe({
      next: (data) => this.newsList = data,
      error: (err) => console.error('Erro ao carregar notícias:', err)
    });
  }

  deleteNews(id: number) {
    if (!confirm('Tem certeza que deseja deletar esta notícia?')) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        // Remove do array local para atualizar a interface
        this.newsList = this.newsList.filter(n => n.id !== id);
        alert('Notícia deletada com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao deletar notícia:', err);
        alert('Erro ao deletar notícia. Veja o console.');
      }
    });
  }
}
