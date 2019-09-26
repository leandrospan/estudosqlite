import { Component, OnInit } from '@angular/core';

import { BancodedadosService, Dev } from '../services/bancodedados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-desenvolvedor',
  templateUrl: './desenvolvedor.page.html',
  styleUrls: ['./desenvolvedor.page.scss'],
})
export class DesenvolvedorPage implements OnInit {

  public desenvolvedor: Dev = null;
  public habilidades = '';

  constructor(
    private rota: ActivatedRoute, 
    private bd: BancodedadosService, 
    private roteador: Router, 
    private toast: ToastController) { }
 
  ngOnInit() {
    this.rota.paramMap.subscribe(params => {
      let devId = params.get('codigo');
 
      this.bd.getDesenvolvedor(devId).then(data => {
        this.desenvolvedor = data;
        this.habilidades = this.desenvolvedor.habilidades.join(',');
      });
    });
  }

  public deletar() {
    this.bd.deletarDesenvolvedor(this.desenvolvedor.codigo).then(() => {
      this.roteador.navigateByUrl('/');
    });
  }
 
  public atualizarDesenvolvedor() {
    let habilidades = this.habilidades.split(',');
    habilidades = habilidades.map(habilidade => habilidade.trim());
    this.desenvolvedor.habilidades = habilidades;
 
    this.bd.atualizarDesenvolvedor(this.desenvolvedor).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Desenvolvedor atualizado',
        duration: 3000
      });
      toast.present();
    });
  }

}
 