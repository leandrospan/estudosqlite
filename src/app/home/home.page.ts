import { Component } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sqlite: SQLite) {}


  public teste() : void {
    this.sqlite.create({
      name: 'dados.db',
      location: 'default'
    }).then((bd: SQLiteObject) => {
      bd.executeSql('CREATE TABLE naves(nome VARCHAR(32))', [])
      .then(() => console.log('SQL Executado'))
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
