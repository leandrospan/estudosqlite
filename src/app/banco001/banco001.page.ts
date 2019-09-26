import { Component, OnInit } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-banco001',
  templateUrl: './banco001.page.html',
  styleUrls: ['./banco001.page.scss'],
})
export class Banco001Page implements OnInit {

  public objetoBancodeDados: SQLiteObject; // Objeto instanciado Banco de dados
  public nome_modelo: string = ""; // modelo de campo de entrada
  public linhas_dados: any = []; // linhas da tabela
  public readonly nome_bancodedados: string = "bancoteste001.db";
  public readonly nome_tabela: string = "clientes";

  constructor(
    private sqlite: SQLite,
    private plataforma: Platform
    ) { 
      this.plataforma.ready().then(() => {
        this.criarBD();
      })
      .catch(e => {
        alert("erro " + JSON.stringify(e));
      });
    }

  ngOnInit() {
  }

  public criarBD() {
    this.sqlite.create({
      name: this.nome_bancodedados,
      location: 'default'
    })
    .then((bd: SQLiteObject) => {
      this.objetoBancodeDados = bd;
      alert('Banco de dados bancoteste001 Criado!');
    })
    .catch(e => {
      alert("erro " + JSON.stringify(e));
    });
  }

  public criarTabela() {
    this.objetoBancodeDados.executeSql('CREATE TABLE IF NOT EXISTS ' + this.nome_tabela + '(codigo INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(255))', [])
    .then(() => {
      alert('Tabela Criada!');
    })
    .catch(e => {
      alert("erro " + JSON.stringify(e));
    });
  }

  public inserirLinha() {
    if (!this.nome_modelo.length) {
      alert("Digite o nome: ");
      return;
    }
    this.objetoBancodeDados.executeSql('INSERT INTO ' + this.nome_tabela + ' (nome) VALUES ("' + this.nome_modelo + '")', [])
    .then(() => {
      alert('Linha inserida!!!');
      this.getLinhas();
    }).catch(e => {
      alert("erro " + JSON.stringify(e));
    });
  }

  public getLinhas() {
    this.objetoBancodeDados.executeSql("SELECT * FROM " + this.nome_tabela, [])
    .then((resposta) => {
      this.linhas_dados = [];
      if (resposta.linhas.linhas > 0) {
        for (var i = 0; i < resposta.linhas.linhas; i++) {
          this.linhas_dados.push(resposta.linhas.item(i));
        }
      }
    })
    .catch(e => {
      alert("erro " + JSON.stringify(e));
    });
  }

  public deletarLinha(item) {
    this.objetoBancodeDados.executeSql("DELETE FROM " + this.nome_tabela + " WHERE codigo = " + item.codigo, [])
    .then((resposta) => {
      alert("Linha Deletada!!!");
      this.getLinhas();
    })
    .catch(e => {
      alert("erro " + JSON.stringify(e));
    });
  }

}
