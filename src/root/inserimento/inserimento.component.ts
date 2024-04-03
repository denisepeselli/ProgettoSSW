import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { creaLibri, Libro } from '../libro';
import { Archivio } from '../archivio';
import { BibliotecaService } from '../biblioteca.service';
import { AjaxResponse } from 'rxjs/internal/ajax/AjaxResponse';

@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class InserimentoComponent implements OnInit {
  @Input() posizione: string;
  @Output() indietroEvent = new EventEmitter<string>();
  
  clean() {
    this.indietroEvent.emit('principale');
    let feedback: HTMLElement = document.getElementById('feedback');
    feedback.innerHTML ="";
    
  }

 

  archivio: Archivio = new Archivio([]);
  aggiuntalibro() {
    let feedback: HTMLElement = document.getElementById('feedback');
    let inputTitolo: HTMLInputElement = document.getElementById(
      'newTitolo'
    ) as HTMLInputElement;
    let inputAutore: HTMLInputElement = document.getElementById(
      'newAutore'
    ) as HTMLInputElement;
    let inputPosizione: HTMLInputElement = document.getElementById(
      'newPosizione'
    ) as HTMLInputElement;
    if (!inputTitolo.value || !inputAutore.value || !inputPosizione.value) {
      feedback.innerHTML="Inserimento non andato a buon fine!"
    } else {
      let nuovoTitolo = inputTitolo.value;
      let nuovoAutore = inputAutore.value;
      let nuovaPosizione = inputPosizione.value;
      let libro = new Libro(nuovoTitolo, nuovoAutore, nuovaPosizione);

      this.bibl.getArchivio().subscribe({
        next: (x: AjaxResponse<any>) => {
          let libri = [];
          JSON.parse(x.response).libri.forEach((oldLibro: Libro) =>
            creaLibri(oldLibro, libri)
          );
          let archivio: Archivio = new Archivio(libri);

          if(archivio.verificaPosizione(libro.posizione)){
            feedback.innerHTML="E' già presente un volume in questa posizione!";
          } else{

          
          archivio.nuovoLibro(libro);

          this.bibl.setArchivio(archivio).subscribe({
            next: (x: AjaxResponse<any>) => {
              feedback.innerHTML= "Inserimento avvenuto con successo!";
              setTimeout(() => {
                this.clean();
              }, 1500);
            },
            error: (err) => {
              feedback.innerHTML="Inserimento non andato a buon fine!"
              console.error('Observer got an error: ' + JSON.stringify(err));
            },
          });
        }
          error: (err) => {
            feedback.innerHTML="Inserimento non andato a buon fine!"
            console.error('Observer got an error: ' + JSON.stringify(err));
          };
        },
      });
    }
  }

  constructor(private bibl: BibliotecaService) {}

  ngOnInit() {}
}
