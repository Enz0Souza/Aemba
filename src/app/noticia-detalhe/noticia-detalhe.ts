import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../api/news.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-noticia-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia-detalhe.html',
  styleUrls: ['./noticia-detalhe.css']

})
export class NoticiasDetalheComponent implements OnInit {
  noticia: any;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private titleService: Title
  ) {}

 ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id')!;
  this.newsService.getNewsById(id).subscribe(data => {
  this.noticia = data;
  console.log(this.noticia);
  });
}
}
