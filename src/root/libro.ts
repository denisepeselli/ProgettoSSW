export class Libro {
  titolo: string;
  autore: string;
  posizione: string;
  prestito: string;
  constructor(
    titolo: string,
    autore: string,
    posizione: string,
    prestito: string= undefined
  ){
    this.titolo=titolo;
    this.autore=autore;
    this.posizione=posizione;
    this.prestito=prestito;
  }
  stringa(){
    
    return "Posizione: " + this.posizione + "<br>Autore: "+  this.autore + "<br>Titolo: " + this.titolo;
}

}

export function creaLibri(oldLibro : Libro, libri: Array<Libro>) {
  let oldTitolo : string = oldLibro.titolo;
  let oldAutore : string = oldLibro.autore;
  let oldPosizione : string = oldLibro.posizione;
  let oldPrestito: string =oldLibro.prestito;
  libri.push(new Libro (oldTitolo, oldAutore, oldPosizione, oldPrestito))
}