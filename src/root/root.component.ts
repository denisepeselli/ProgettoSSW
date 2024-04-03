import { Component, OnInit  } from '@angular/core';
import {InserimentoComponent} from './inserimento/inserimento.component';
import { CommonModule } from '@angular/common';
import { RicercaComponent } from './ricerca/ricerca.component';
import {Libro} from './libro';
import {Archivio} from './archivio';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  standalone: true,
  imports:[ InserimentoComponent, CommonModule, RicercaComponent ],
})
export class RootComponent implements OnInit {

  constructor() { }

 
  posizione: string ='principale';

  cambio(pos: string){
    this.posizione=pos;
    console.log(this.posizione);
  }
 
  
  
 
  

  ngOnInit() {
  }

}