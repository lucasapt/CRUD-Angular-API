import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent {

  public produto: Produto = new Produto();
  public proximoId: number = 0;

  constructor(private _produtoService: ProdutoService, private _router: Router) {
    // Obtém a lista de produtos para determinar o próximo ID disponível
    this._produtoService.getProdutos().subscribe(
      produtos => {
        // Encontra o maior ID atualmente usado
        const ids = produtos.map(produto => produto.id);
        this.proximoId = Math.max(...ids) + 1; // Determina o próximo ID
      },
      error => {
        console.error("Erro ao obter produtos:", error);
      }
    );
  }

  cadastrar(): void {
    // Define o ID do produto antes de cadastrar
    this.produto.id = this.proximoId;
    
    this._produtoService.cadastrarProduto(this.produto).subscribe(
      produto => {
        this.produto = new Produto();

        alert("Cadastro efetuado com sucesso.");
        this._router.navigate(["restrito/lista"]);
      },
      error => {
        console.error("Erro ao cadastrar:", error);
      }
    );
  }
}
