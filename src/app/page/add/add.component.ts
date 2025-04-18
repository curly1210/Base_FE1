import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      price: [null, [Validators.required, Validators.min(100)]],
      status: [null, [Validators.required]],
      image: ['', [Validators.required]],
      category: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.productService.insert(this.productForm.value).subscribe({
      next: () => {
        alert('Thêm thành công');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        alert('Lỗi');
      },
    });
  }
}
