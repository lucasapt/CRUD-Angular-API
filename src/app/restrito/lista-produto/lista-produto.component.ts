import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { Produto } from 'src/app/models/Produto.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent implements OnInit {

  public produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService, private _router: Router, private _loginService: LoginService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarProdutos();
    this._loginService.setMostraMenu(false);
    this.cdr.detectChanges();
  }

  listarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      produtos => {
        this.produtos = produtos;
      },
      error => {
        console.error("Erro ao listar produtos:", error);
      }
    );
  }

  excluir(id: number) {
    this.produtoService.removerProduto(id).subscribe(
      produto => {
        alert("Produto excluído com sucesso!");
        this.listarProdutos();
        this._router.navigate(["/restrito/lista"]); // Movido para dentro do bloco subscribe
      },
      error => {
        console.error("Erro ao excluir produto:", error);
      }
    );
  }  
}
