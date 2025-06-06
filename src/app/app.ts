import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'

})
export class App {
  protected title = 'DulcemaniaWeb';
  protected compra = "Comprar";
  menuOpen = false;
}

export class AppModule {}


