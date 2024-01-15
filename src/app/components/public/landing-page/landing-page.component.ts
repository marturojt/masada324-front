import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { format } from 'date-fns';


// Init de JQuery y Materialize CSS
declare var M: any; // MaterializeCSS

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  // Variables
  anioActual: string;

  constructor() { }



  ngOnInit(): void {


    // Al iniciar la pantalla obtenemos el año

    this.anioActual = format(new Date(), 'yyyy');
  }


  ngAfterViewInit(): void {
    console.log('a')

    // Parallax materializecss
    var elemsParallax = document.querySelectorAll('.parallax');
    var instancesParallax = M.Parallax.init(elemsParallax, {});


  }

}
