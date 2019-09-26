import { Injectable } from '@angular/core';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

export interface Dev {
  codigo: number,
  nome: string,
  habilidades: any[],
  imagem: string
}
 
@Injectable({
  providedIn: 'root'
})
export class BancodedadosService {

  private bancodedados: SQLiteObject;
  private bdPronto: BehaviorSubject<boolean> = new BehaviorSubject(false);
  desenvolvedores = new BehaviorSubject([]);
  produtos = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
  ) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'desenvolvedores.db',
        location: 'default'
      }).then((bd: SQLiteObject) => {
        this.bancodedados = bd;
        this.sementeBancodedados();
      });
    });
  }

  public sementeBancodedados() {
    this.http.get('assets/semente.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.bancodedados, sql)
      .then(_ => {
        this.carregaDesenvolvedores();
        this.carregaProdutos();
        this.bdPronto.next(true);
      })
      .catch(e => console.error(e));
    });
  }

  public getEstadoBancodedados() {
    return this.bdPronto.asObservable();
  }

  public getDevs(): Observable<Dev[]> {
    return this.desenvolvedores.asObservable();
  }

  public getProdutos(): Observable<any[]> {
    return this.produtos.asObservable();
  }

  public carregaDesenvolvedores() {
    return this.bancodedados.executeSql('SELECT * FROM desenvolvedor', [])
    .then(data => {
      let desenvolvedores: Dev[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let habilidades = [];
          if (data.rows.item(i).habilidades != '') {
            habilidades = JSON.parse(data.rows.item(i).habilidades);
          }
          desenvolvedores.push({
            codigo: data.rows.item(i).codigo,
            nome: data.rows.item(i).nome,
            habilidades: habilidades,
            imagem: data.rows.item(i).imagem
          });
        }
      }
      this.desenvolvedores.next(desenvolvedores);
    });
  }

  public adicionarDesenvolvedor(nome, habilidades, imagem) {
    let dados = [nome, JSON.stringify(habilidades), imagem];
    return this.bancodedados.executeSql('INSERT INTO desenvolvedor (nome, habilidades, imagem) VALUES (?, ?, ?)', dados).then(data => {
      this.carregaDesenvolvedores();
    });
  }

  public getDesenvolvedor(codigo): Promise<Dev> {
    return this.bancodedados.executeSql('SELECT * FROM desenvolvedor WHERE codigo = ?', [codigo]).then(data => {
      let habilidades = [];
      if (data.rows.item(0).habilidades != '') {
        habilidades = JSON.parse(data.rows.item(0).habilidades);
      }
      return {
        codigo: data.rows.item(0).codigo,
        nome: data.rows.item(0).nome,
        habilidades: habilidades,
        imagem: data.rows.item(0)
      }
    });
  }

  public deletarDesenvolvedor(codigo) {
    return this.bancodedados.executeSql('DELETE FROM desenvolvedor WHERE codigo = ?', [codigo]).then(_ => {
      this.carregaDesenvolvedores();
      this.carregaProdutos();
    });
  }

  public atualizarDesenvolvedor(dev: Dev) {
    let data = [dev.nome, JSON.stringify(dev.habilidades), dev.imagem];
    return this.bancodedados.executeSql('UPDATE desenvolvedor SET nome = ?, habilidades = ?, imagem = ? WHERE codigo = ${dev.codigo}', data).then(data => {
      this.carregaDesenvolvedores();
    });
  }

  public carregaProdutos() {
    let query = 'SELECT produto.nome, produto.codigo, desenvolvedor.nome AS criador FROM produto JOIN desenvolvedor ON desenvolvedor.codigo = produto.codigocriador';
    return this.bancodedados.executeSql(query, []).then(data => {
      let produtos = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          produtos.push({
            nome: data.rows.item(i).nome,
            codigo: data.rows.item(i).codigo,
            criador: data.rows.item(i).criador,
          });
        }
      }
      this.produtos.next(produtos);
    });
  }

  public adicionarProdutos(nome, criador) {
    let data = [nome, criador];
    return this.bancodedados.executeSql('INSERT INTO produto (nome, codigocriador) VALUES (?, ?)', data).then(data => {
      this.carregaProdutos();
    });
  }
}
