import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import  jsPeliculas  from 'src/assets/json/listaPelis.json'


@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {
  listaPelis: any = jsPeliculas;
  nombreUsuario=(localStorage.getItem("Usuario"))?.split("/")[1] ;
  carrito = [{
    id:null,
    nombre:null,
    detalle:null,
    director:null, 
    clasificacion:null,
    imagen:null,
    costo:null
  }];
  costoTotal=0;
  pedido=0;
  nav = document.getElementsByClassName("navbar navbar-expand bg-black bg-opacity-1")[0];

  onCerrarSesion(){
    localStorage.removeItem("Usuario");
    this.nav?.setAttribute("style","display:block;");
    window.open("http://localhost:4200/inicio","_self")
  }
  onBuscar(num: number){

    let titulo = document.getElementById("pTitulo") as HTMLElement;
    let director = document.getElementById("modalDirector") as HTMLElement;
    let detalle = document.getElementById("modalDetalle") as HTMLElement;
    let clasificacion = document.getElementById("modalClasificacion") as HTMLElement;
    let imagen = document.getElementById("modalImagen") as HTMLElement;
    let costo = document.getElementById("costo") as HTMLElement;

    
    imagen?.setAttribute("src",this.listaPelis[num-1].imagen);
    titulo.innerHTML=this.listaPelis[num-1].nombre;
    director.innerHTML=this.listaPelis[num-1].director;
    detalle.innerHTML=this.listaPelis[num-1].detalle;
    clasificacion.innerHTML=this.listaPelis[num-1].clasificacion;
    costo.innerHTML=this.listaPelis[num-1].costo;

  }
  onAgregar(num:number){
    this.pedido += 1;

      this.carrito.push({
        id:this.listaPelis[num-1].id,
        nombre:this.listaPelis[num-1].nombre,
        detalle:this.listaPelis[num-1].detalle,
        director:this.listaPelis[num-1].director,
        clasificacion:this.listaPelis[num-1].clasificacion,
        imagen:this.listaPelis[num-1].imagen,
        costo:this.listaPelis[num-1].costo,

      })
      if(this.costoTotal===0){
        this.costoTotal = this.listaPelis[num-1].costo;
      }else{
      this.costoTotal = this.costoTotal+this.listaPelis[num-1].costo;
      }
      
    console.log(this.carrito.length)
    document.getElementsByClassName("table")[0].lastElementChild?.firstElementChild?.setAttribute("style","display:none !important;");
    console.log("borro")
    
  }
  onVerCarrito(){
    //delete this.carrito[0];
    document.getElementsByClassName("table")[0].lastElementChild?.firstElementChild?.setAttribute("style","display:none !important;");
  }
  onComprar(){
    this.carrito = [{
      id:null,
      nombre:null,
      detalle:null,
      director:null, 
      clasificacion:null,
      imagen:null,
      costo:null
    }];
    this.costoTotal=0;
    this.pedido=0;
  }
  loadActionButton(){
    console.log(this.listaPelis.length);
    for(let i=0;i<=this.listaPelis.length;i++){
      console.log('Entro for')
      let btns = document.getElementById("btnMasInfo"+i);
      btns?.addEventListener("click",()=>{
        console.log("x")

        let titulo = <HTMLInputElement>document.getElementById("pTitulo");
        titulo.value="Hola";
      })
    }
  }
  constructor() { }
  ngOnInit(): void {
    if(localStorage.getItem("Usuario")===null){
      window.open("http://localhost:4200/","_self")
    }
    this.nav?.setAttribute("style","display:none;");
    //this.loadActionButton();

  }
 
}
