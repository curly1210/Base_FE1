import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  constructor(private productService: ProductService) {}

  products: any;

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.productService.getList().subscribe({
      next: (data) => {
        this.products = data;
        // console.log(data);
      },
      error: (err) => {
        alert('Lỗi');
      },
    });
  }

  onRemove(id: number) {
    if (confirm('Xác nhận xóa sản phẩm')) {
      this.productService.remove(id).subscribe({
        next: () => {
          this.getList();
          alert('Xóa thành công');
          // this.products = data;
          // console.log(data);
        },
        error: (err) => {
          alert('Lỗi');
        },
      });
    }
  }
}
