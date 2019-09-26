import { Component, OnInit } from '@angular/core';

import { BancodedadosService, Dev } from '../services/bancodedados.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-desenvolvedores',
  templateUrl: './desenvolvedores.page.html',
  styleUrls: ['./desenvolvedores.page.scss'],
})
export class DesenvolvedoresPage implements OnInit {

  public desenvolvedores: Dev[] = [];
  public produtos: Observable<any[]>;
  public desenvolvedor = {};
  public produto = {};
  public visaoSelecionada = 'devs';

  constructor(private bd: BancodedadosService) { }

  ngOnInit() {
    this.bd.getEstadoBancodedados().subscribe(rdy => {
      if (rdy) {
        this.bd.getDevs().subscribe(devs => {
          this.desenvolvedores = devs;
        })
        this.produtos = this.bd.getProdutos();
      }
    });
  }
 
  public adicionarDesenvolvedor() {
    let habilidades = this.desenvolvedor['habilidades'].split(',');
    habilidades = habilidades.map(habilidades => habilidades.trim());

    this.bd.adicionarDesenvolvedor(this.desenvolvedor['nome'], habilidades, this.desenvolvedor['imagem'])
    .then(_ => {
      this.desenvolvedor = {};
    });
  }

  public adicionarProduto() {
    this.bd.adicionarProdutos(this.produto['nome'], this.produto['criador'])
    .then(_ => {
      this.produto = {};
    });
  }

}
