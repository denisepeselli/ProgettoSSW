import { Libro } from './libro';
export class Archivio {
  libri: Array<Libro>;
  constructor(libri: Array<Libro>) {
    this.libri = libri;
  }

  nuovoLibro(libro: Libro): void {
    if (this.libri == null) {
      this.libri = [libro];
    } else {
      this.libri.push(libro);
    }
  }

  verificaPosizione(posizione): boolean {
    let verifica: boolean = false;
    this.libri.forEach((libro)=>{
      if(posizione== libro.posizione){
        verifica=true;
      }
    });
    
    return verifica;

  }

  ricercaStringa(): Array<Libro> {
    let numLibri: number;
    let nuovaRicerca: HTMLInputElement = document.getElementById(
      'newRicerca'
    ) as HTMLInputElement;
    let stringa: string = nuovaRicerca.value;
    if (stringa== null || stringa=="") {
      return [];
    }
    else {
      let corrispondenze: Array<Libro> = [];
      this.libri.filter((libro) => {
        if (
          libro.titolo
            .toLowerCase()
            .concat(libro.autore.toLowerCase())
            .search(stringa.toLowerCase()) != -1
        ) {
          corrispondenze.push(libro);
        }
     
      });
      return corrispondenze;
    }
  }
}
