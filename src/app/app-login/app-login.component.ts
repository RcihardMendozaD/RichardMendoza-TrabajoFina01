import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {

  usuario:FormGroup = this.fb.group({
    nombre: [null, [Validators.required]],
    apellidos: [null, [Validators.required]],
    correo: [null, [Validators.required,Validators.email]],
    clave: [null, [Validators.required]],
    claveRepetir: [null, [Validators.required]],
    genero: [null],
    urs: [null],
  })

  login = new FormGroup({
    //id: new FormControl(''),
    usrLogin: new FormControl('', Validators.required),
    pasLogin: new FormControl('', Validators.required),
  })

  typeAlert="";

  datosUsiario=[{
                //id:,
                nombre:String,
                apellidos:String,
                correo:String,
                clave:String,
                genero:String,
                usr:"",
                }];
datosJson = [{
                nombre:String,
                apellidos:String,
                correo:String,
                clave:String,
                genero:String,
                usr:"",
}];

  visualizarRegistro:boolean = true;
  mensajeTituloModal:string = "";
  mensajeDetalleModal:string ="";

  onRegistrar(){

    let randomUsr = this.crearUsuario();
    if(this.usuario.get("clave")?.value == this.usuario.get("claveRepetir")?.value){
      
      this.datosUsiario.push({
         nombre:(this.usuario.get("nombre")?.value).toUpperCase(),
         apellidos:(this.usuario.get("apellidos")?.value).toUpperCase(),
         correo:this.usuario.get("correo")?.value,
         clave:(this.usuario.get("clave")?.value),
         genero:(this.usuario.get("genero")?.value).toUpperCase(),
         usr:randomUsr,
             });

        this.typeAlert="alert-success";
        this.mensajeTituloModal = "Bienvenido a la familia Movie - Flow"
        this.mensajeDetalleModal = "Hola " + this.usuario.get("nombre")?.value + " tu registro fue exitoso, ahora podras ingresar con tu usuario " + randomUsr + " ó  con tu correo electronico " + this.usuario.get("correo")?.value;
        this.visualizarRegistro = false;


        if(localStorage.getItem("ListaUsuarios")===null){
          localStorage.setItem("ListaUsuarios",JSON.stringify(this.datosUsiario));
        }else{
          this.datosJson = JSON.parse(""+localStorage.getItem("ListaUsuarios"));
          localStorage.setItem("ListaUsuarios",JSON.stringify((this.datosJson?.concat(this.datosUsiario))));
        }

    }else{
      console.log("error");
      this.typeAlert="alert-danger";
      this.mensajeTituloModal = "Error"
      this.mensajeDetalleModal = "Se detecto un error en sus credenciales, por favor volver a intentarlo."
    }
    
  }

  onLoadIniciarSesion(){
    console.log("ddd");
    window.open("http://localhost:4200/iniciarSesion","_self");

  }


  crearUsuario(){
    let numeroRandom = Math.trunc(Math.random()*1000)
    let miCadenaUno = this.usuario.get("nombre")?.value.substr(0,3);// this.MiRango.split(this.Separador)[Num];
    let miCadenaDos = this.usuario.get("apellidos")?.value.substr(0,3);

    return "MVF" + miCadenaUno.toUpperCase()+ miCadenaDos.toUpperCase()+numeroRandom;
  }

  onIngresar(){
    let data =
      [{
        nombre:String,
        apellidos:String,
        correo:String,
        clave:String,
        genero:String,
        usr:String,
              }];
    data = JSON.parse(""+localStorage.getItem("ListaUsuarios"));

    let usrLogin = this.login.get("usrLogin")?.value;
    let pasLogin = this.login.get("pasLogin")?.value;
    
    let dataLogin = [{nombre:String,
                    apellidos:String,
                    correo:String,
                    clave:String,
                    genero:String,
                    usr:String,}]

    dataLogin=data;
    let obtenerClave = dataLogin.find( dataLogin => dataLogin.usr === usrLogin &&  dataLogin.clave === pasLogin);

   
    if(usrLogin=="" || pasLogin==""){
      console.log("erro");
    }else{
    if(obtenerClave===undefined){
      obtenerClave = dataLogin.find( dataLogin => dataLogin.correo === usrLogin);
      if(obtenerClave?.clave === pasLogin)
        {
          localStorage.setItem('Usuario', obtenerClave?.usr+"/"+obtenerClave?.nombre+"/"+obtenerClave?.genero);
          window.open("http://localhost:4200/listaPeliculas","_self");
        }else{
          console.log("erro");
        }
    }else{
      if(obtenerClave?.clave === pasLogin)
      {
        localStorage.setItem('Usuario', obtenerClave?.usr+"/"+obtenerClave?.nombre+"/"+obtenerClave?.genero);
        window.open("http://localhost:4200/listaPeliculas","_self")
      }else{
        console.log("erro");
      }
    }}
  }

  constructor(private fb:FormBuilder) { }

  
  ngOnInit(): void {
    if(document.location.href=="http://localhost:4200/iniciarSesion"){
      this.visualizarRegistro = false;

    }else if(document.location.href=="http://localhost:4200/registrarse"){
      this.visualizarRegistro = true;
    }

  
  }

}
