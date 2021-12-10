import { Component} from '@angular/core';
import  jsPeliculas  from 'src/assets/json/listaPelis.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'servicio-streaming';

  listaPelis: any = jsPeliculas;
}
