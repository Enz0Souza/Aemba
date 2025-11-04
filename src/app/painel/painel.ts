import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NewsService } from '../../api/news.service';

interface Paragraph {
  text: string;
  imagesPreview: string[];
}

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel.html',
  styleUrls: ['./painel.css']
})
export class Painel {
  title = '';
  subtitle = '';
  paragraphs: Paragraph[] = [{ text: '', imagesPreview: [] }];
  coverFile: File | null = null;
  useCarousel = false;
  currentSlide = 0;
  previewVisible = false;

  constructor(private newsService: NewsService, private router: Router) {}

  onCoverImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) this.coverFile = file;
  }

  onParagraphImageUpload(event: any, paragraphIndex: number): void {
    const files = Array.from(event.target.files) as File[];
    if (!files.length) return;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = () => this.paragraphs[paragraphIndex].imagesPreview.push(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  removerParagrafoImagem(i: number, j: number): void {
    this.paragraphs[i].imagesPreview.splice(j, 1);
  }

  addParagraph(): void {
    this.paragraphs.push({ text: '', imagesPreview: [] });
  }

  removeParagraph(index: number): void {
    if (this.paragraphs.length > 1) this.paragraphs.splice(index, 1);
  }

  visualizar(): void {
    if (!this.title || this.paragraphs.every(p => !p.text.trim())) {
      alert('Preencha o título e o conteúdo antes de visualizar.');
      return;
    }
    this.previewVisible = true;
  }

  fecharPreview(): void {
    this.previewVisible = false;
  }

 publicar(): void {
  if (!this.title || !this.coverFile) {
    alert('Preencha o título e adicione uma imagem de capa antes de publicar.');
    return;
  }

  const formData = new FormData();
  formData.append('title', this.title);
  formData.append('subtitle', this.subtitle);
  formData.append('useCarousel', String(this.useCarousel));
  formData.append('image', this.coverFile); // ✅ trocado para "image", conforme o back-end espera
  formData.append('paragraphs', JSON.stringify(this.paragraphs));

  this.newsService.addNews(formData).subscribe({
    next: () => {
      alert('Notícia publicada com sucesso!');
      this.limparFormulario();
    },
    error: (err) => {
      console.error('Erro ao publicar notícia:', err);
      alert('Ocorreu um erro ao publicar. Verifique o console.');
    }
  });
}

  private limparFormulario(): void {
    this.title = '';
    this.subtitle = '';
    this.paragraphs = [{ text: '', imagesPreview: [] }];
    this.coverFile = null;
    this.previewVisible = false;
    this.useCarousel = false;
    this.currentSlide = 0;
  }
}
