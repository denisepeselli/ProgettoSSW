import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaService } from '../../biblioteca.service';
import { AjaxResponse } from 'rxjs/internal/ajax/AjaxResponse';
import { Archivio } from '../../archivio';
import { creaLibri, Libro } from '../../libro';

@Component({
  selector: 'app-prestito',
  templateUrl: './prestito.component.html',
  styleUrls: ['./prestito.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PrestitoComponent implements OnInit {
  @Input() unicaCorr: boolean;
  @Input() occorrenza: Libro;
  @Input() prestito: boolean;
  @Output() indietroEvent = new EventEmitter<string>();

  clean() {
    this.indietroEvent.emit('principale');
    let feedback: HTMLElement = document.getElementById('feedback2');
    feedback.innerHTML ="";
    
  }
  
  registrazionePrestito() {
    this.bibl.getArchivio().subscribe({
      next: (x: AjaxResponse<any>) => {
        let feedback: HTMLElement= document.getElementById("feedback1");
        let libri = [];
        JSON.parse(x.response).libri.forEach((oldLibro: Libro) => {
          if (oldLibro.posizione == this.occorrenza.posizione) {
            let newPrestito: HTMLInputElement = document.getElementById(
              'newPrestito'
            ) as HTMLInputElement;
            if (newPrestito != null){oldLibro.prestito = newPrestito.value;
            }
          }
          creaLibri(oldLibro, libri);
        });

        let archivio: Archivio = new Archivio(libri);
        this.bibl.setArchivio(archivio).subscribe({
          next: (x: AjaxResponse<any>) => {
            
            feedback.innerHTML="Prestito effettuato con successo!";
            setTimeout(() => {
              this.prestito = true;
              this.clean();
            }, 1500);
          },
          error: (err) => {
            feedback.innerHTML="Prestito non andato a buon fine!";
            console.error('Observer got an error: ' + JSON.stringify(err));
          },
        });
        error: (err) => {
          feedback.innerHTML="Prestito non andato a buon fine!";
          console.error('Observer got an error: ' + JSON.stringify(err));
        };
      },
    });
  }
  restituzione() {
    this.bibl.getArchivio().subscribe({
      next: (x: AjaxResponse<any>) => {
        let feedback: HTMLElement= document.getElementById("feedback1");
        let libri = [];
        JSON.parse(x.response).libri.forEach((oldLibro: Libro) => {
          if (oldLibro.posizione == this.occorrenza.posizione) {
            oldLibro.prestito = undefined;
          }
          creaLibri(oldLibro, libri);
        });
        let archivio: Archivio = new Archivio(libri);
        
        this.bibl.setArchivio(archivio).subscribe({
          next: (x: AjaxResponse<any>) => {
            feedback.innerHTML="Restituzione effettuata con successo!";
            setTimeout(() => {
              this.prestito = false;
              this.clean();
            }, 1000);
            
          },
          error: (err) => {
            console.error('Observer got an error: ' + JSON.stringify(err));
          },
        });
        error: (err) => {
          console.error('Observer got an error: ' + JSON.stringify(err));
        };
      },
    });
  }
  constructor(private bibl: BibliotecaService) {}
  ngOnInit() {}
}
