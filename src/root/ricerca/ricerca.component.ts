import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Archivio } from '../archivio';
import { creaLibri, Libro } from '../libro';
import { PrestitoComponent } from './prestito/prestito.component';
import { RimozioneComponent } from './rimozione/rimozione.component';
import { BibliotecaService } from '../biblioteca.service';
import { AjaxResponse } from 'rxjs/internal/ajax/AjaxResponse';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  imports: [CommonModule, PrestitoComponent, RimozioneComponent],
  standalone: true,
})
export class RicercaComponent implements OnInit {
  @Input() posizione: string;
  @Output() indietroEvent = new EventEmitter<string>();

  cambioRicerca(pos: string){
    this.indietroEvent.emit('principale');
    this.clean();  
  }

  clean() {
    this.indietroEvent.emit('principale');
    this.unicaCorr = undefined;
    console.log(this.posizione);
  }
  unicaCorr: boolean = undefined;
  occorrenza: Libro = null;
  prestito: boolean = false;
  input() {
    this.bibl.getArchivio().subscribe({
      next: (x: AjaxResponse<any>) => {
        let libri = [];
        JSON.parse(x.response).libri.forEach((oldLibro: Libro) =>
          creaLibri(oldLibro, libri)
        );
        let archivio: Archivio = new Archivio(libri);
        let risultato: Array<Libro> = archivio.ricercaStringa();
        let numLibri = risultato.length;
        let para: HTMLElement = document.getElementById('para');
        if (numLibri == 1) {
          this.unicaCorr = true;
          this.occorrenza = risultato[0];
          para.innerHTML = this.occorrenza.stringa();
          this.prestito = this.occorrenza.prestito != undefined;
          console.log(this.prestito);
        } else {
          para.innerHTML = numLibri.toString();
        }
        error: (err) => {
          console.error('Observer got an error: ' + JSON.stringify(err));
        };
      },
    });
  }

  constructor(private bibl: BibliotecaService) {}

  ngOnInit() {}
}
