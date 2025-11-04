import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Painel } from './painel/painel';
import { AuthGuard } from './auth-guard';
import { NoticiasListaComponent } from './noticias/noticias';
import { NoticiasDetalheComponent } from './noticia-detalhe/noticia-detalhe';
import { AjudaAemba } from './ajuda-aemba/ajuda-aemba';
import { Duvidas } from './duvidas/duvidas';
import { SobreNos } from './sobre-nos/sobre-nos';
import { Admin } from './admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'painel', component: Painel , canActivate: [AuthGuard]  },
  { path: 'admin', component: Admin , canActivate: [AuthGuard]  },
  { path: 'Quero-Ajudar', component: AjudaAemba },
  { path: 'Duvidas', component: Duvidas },
  { path: 'Sobre-nós', component: SobreNos },
  { path: 'Noticias', component: NoticiasListaComponent },
  { path: 'noticias/:id', component: NoticiasDetalheComponent },
  { path: '**', redirectTo: '' },
];
