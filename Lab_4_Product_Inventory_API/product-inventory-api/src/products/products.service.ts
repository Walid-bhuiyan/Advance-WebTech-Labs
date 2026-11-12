import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,ILike } from 'typeorm';
import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import {PartialUpdateProductDto} from './dtos/partial-update-product.dto.js'
import { UpdateProductDto } from './dtos/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}
  async create(dto: CreateProductDto) {
  const product = await this.productsRepo.create(dto);
  const savedProduct = await this.productsRepo.save(product);

  return {
    message: 'Product created successfully',
    data: savedProduct,
  };
}
async update(id: number, dto: PartialUpdateProductDto) {
  const product = await this.productsRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  const updatedProduct = Object.assign(product, dto);
  const savedProduct = await this.productsRepo.save(updatedProduct);

  return {
    message: 'Product updated successfully',
    data: savedProduct,
  };
}

async findOne(id: number) {
  const product = await this.productsRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  return {
    message: 'Product retrieved successfully',
    data: product,
  };
}

async findAll() {
  const products =await this.productsRepo.find({
    order: {
      createdAt: 'DESC',
    },
  });

  return {
    message: 'Products retrieved successfully',
    count: products.length,
    data: products,
  };
}
async replace(id: number, dto: UpdateProductDto) {
  const product = await this.productsRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  const updatedProduct = Object.assign(product, dto);
  const savedProduct = await this.productsRepo.save(updatedProduct);

  return {
    message: 'Product replaced successfully',
    data: savedProduct,
  };
}
async remove(id: number) {
  const result = (await this.productsRepo.delete(id)).affected;

  if (result != null && result > 0) {
    return {
      message: 'Product deleted successfully',
      id: id,
    };
  } else {
    throw new NotFoundException('Product not found');
  }
}
async findByCategory(category: string) {
  const products = await this.productsRepo.find({
    where: {
      category: category,
    },
    order: {
      createdAt: 'DESC',
    },
  });

  return {
    message: 'Products retrieved successfully',
    count: products.length,
    data: products,
  };
}
async toggleActive(id: number) {
  const product = await this.productsRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  product.isActive = !product.isActive;

  const savedProduct = await this.productsRepo.save(product);

  return {
    message: 'Product status updated successfully',
    data: savedProduct,
  };
}

async search(keyword: string) {
  const products = await this.productsRepo.find({
    where: {
      name: ILike(`%${keyword}%`),
    },
    order: {
      createdAt: 'DESC',
    },
  });

  return {
    message: 'Products search completed successfully',
    count: products.length,
    data: products,
  };
}

}
