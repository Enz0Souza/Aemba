import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NewsService } from '../../api/news.service';

@Component({
  selector: 'app-noticias-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticias.html',
  styleUrls: ['./noticias.css']
})
export class NoticiasListaComponent implements OnInit {
  noticias: any[] = [];

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
    this.newsService.getNews().subscribe(data => {
      console.log('Dados recebidos:', data);
      this.noticias = data;
    });
    
  }

   abrirNoticia(id: number) {
    this.router.navigate(['/noticias', id]);
  }

  

}
