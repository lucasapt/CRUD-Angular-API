import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from './models/Produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = "http://localhost:3000/produtos";
  //aqui está a injeção para realizar o CRUD
  constructor(private _httpClient: HttpClient) { }
  
  getProduto(id: number): Observable<Produto> {
    //carregar o produto
    const urlIdProduto = `${this.url}?id=${id}`;
    return this._httpClient.get<Produto>(urlIdProduto);
  }
  //listar
  getProdutos(): Observable<Produto[]> {
    return this._httpClient.get<Produto[]>(this.url);
  }

  //cadastrar
  cadastrarProduto(produto: Produto): Observable<Produto[]> {
    return this._httpClient.post<Produto[]>(this.url, produto);
  }

  //editar
  atualizarProduto(id: number, produto: Produto): Observable<Produto[]> {
    const urlAtualizar = `${this.url}/${id}`;
    return this._httpClient.put<Produto[]>(urlAtualizar, produto);
  }

  //deletar
  removerProduto(id: number): Observable<Produto[]> {
    const urlDeletar = `${this.url}/${id}`;
    return this._httpClient.delete<Produto[]>(urlDeletar);
  }
}
