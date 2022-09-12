import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from '@app/_models';
import { BooksService } from '@app/_services';
import Swal from 'sweetalert2';



// Init de JQuery y Materialize CSS
declare var M: any; // MaterializeCSS
declare var $: any; // jQuery

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit, OnDestroy {

  // Datatables
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // Variables
  currentRoute: string;
  booksArray: Books[] = [];

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // Validaciones de la ruta
    router.events.subscribe(() => {
      // this.currentRoute = this.router.url;
      this.currentRoute = this.router.url.split('/')[1];
    });
  }

  ngOnInit(): void {

    // Init de Materialize components
    $(document).ready(function () {
      $('.parallax').parallax();
      // $('#htmlTablaLibros').DataTable();
    });

    //#region  Configuraciones tabla

    var langDatatable = {
      "decimal": "",
      "emptyTable": "No hay datos disponibles en la tabla",
      "info": "Mostrando _START_ de _END_ de _TOTAL_ registros",
      "infoEmpty": "Mostrando 0 de 0 de 0 registros",
      "infoFiltered": "(filtrado de _MAX_ registros totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Criterio de búsqueda",
      "zeroRecords": "No se encontrarón registros que coincidan con la búsqueda",
      "paginate": {
        "first": "Pri.",
        "last": "Últ.",
        "next": "Sig.",
        "previous": "Ant."
      },
      "aria": {
        "sortAscending": ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
      }
    }

    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 5,
      dom: 'lfrtip',
      language: langDatatable,
      columnDefs: [{
        targets: [0,1],
        // visible: false,
        searchable: true
      }],
      drawCallback: function () {
        $("input[type='search']").attr("id", "searchBox");
        $('#searchBox').css("border", "none").css("border-radius", "0px").css("border-bottom", "1px solid #F2EFBB");
      }
    };

    //#endregion

    // Ejecutamos funciones de inicio
    this.fnObtieneLibros();

  }

  //#region INTERACCION CON LA DB

  // Funcion para obtener el listado de libros
  private fnObtieneLibros() {
    this.booksService.getBooks()
      .pipe(first())
      .subscribe(books => {
        this.booksArray = books;
        console.log(this.booksArray);

        // Pintado de la tabla
        this.dtTrigger.next();
      });
  }

  private fnDownloadFile(id: number, tipo: number) {
    // Tipos:
    // 1 -> Kindle, 2 -> PDF, 3-> EPUB
    console.log(id);
    switch (tipo) {
      case 1:
        console.log('Descarga Kindle');
        break;
      case 2:
        console.log('Descarga PDF');
        break;
      case 3:
        console.log('Descarga EPUB');
        break;
      default:
        console.warn('tipo de libro inexistente')
        break;

    }
  }

  //#endregion

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
