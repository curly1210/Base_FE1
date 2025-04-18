import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  productForm!: FormGroup;
  id: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      price: [null, [Validators.required, Validators.min(100)]],
      status: [null, [Validators.required]],
      image: ['', [Validators.required]],
      category: [null, [Validators.required]],
    });

    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    if (this.id) {
      this.productService.getOne(this.id).subscribe({
        next: (data) => {
          console.log(data);
          this.productForm.patchValue(data);
        },
      });
    }
  }

  handleSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.productService.update(this.id!, this.productForm.value).subscribe({
      next: () => {
        alert('Sửa thành công');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        alert('Lỗi');
      },
    });
  }
}
