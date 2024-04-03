import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { creaLibri, Libro } from '../../libro';
import { Archivio } from '../../archivio';
import { BibliotecaService } from '../../biblioteca.service';
import { AjaxResponse } from 'rxjs/internal/ajax/AjaxResponse';

@Component({
  selector: 'app-rimozione',
  templateUrl: './rimozione.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./rimozione.component.css'],
})
export class RimozioneComponent implements OnInit {
  @Input() unicaCorr: boolean;
  @Input() posizione :string;
  @Input() occorrenza: Libro;
  @Output() indietroEvent = new EventEmitter<string>();
  @Input() prestito: boolean;

  clean() {
    this.indietroEvent.emit('principale');
    let feedback: HTMLElement = document.getElementById('feedback2');
    feedback.innerHTML ="";
    
  }
  
  rimozioneLibro(){
    let feedback: HTMLElement= document.getElementById("feedback2");
    this.bibl.getArchivio().subscribe({
      next: (x: AjaxResponse<any>) => {
        let libri = [];
        JSON.parse(x.response).libri.forEach((oldLibro: Libro) =>{
          
          if(oldLibro.posizione!==this.occorrenza.posizione){
              creaLibri(oldLibro, libri);
          }

          
        }
        );
        
        let archivio: Archivio = new Archivio(libri);
        
        console.log(archivio);
        this.bibl.setArchivio(archivio).subscribe({
          next: (x: AjaxResponse<any>) => {
            if(feedback!= null){
            feedback.innerHTML="Libro rimosso con successo!";
            }
            setTimeout(() => {
              this.clean();
            }, 1500);


          },
          error: (err) => {
            feedback.innerHTML="Inserimento non andato a buon fine!";
            console.error('Observer got an error: ' + JSON.stringify(err));
          },
        });
        error: (err) => {
          feedback.innerHTML="Inserimento non andato a buon fine!";
          console.error('Observer got an error: ' + JSON.stringify(err));
        };
      },
    });
  }
  constructor(private bibl: BibliotecaService) {}
  ngOnInit() {}
}
