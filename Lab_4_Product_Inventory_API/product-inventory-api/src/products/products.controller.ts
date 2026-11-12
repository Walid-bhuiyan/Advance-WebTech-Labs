
import {Controller,Delete,Get,Param,Body,ParseIntPipe,Patch,Post,Put,Query} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { PartialUpdateProductDto } from './dtos/partial-update-product.dto.js';
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productsService.create(product);
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.findAll();
  }

  @Get('search')
  async searchProducts(@Query('keyword') keyword: string) {
    return await this.productsService.search(keyword);
  }

  @Get('category/:cat')
  async getProductsByCategory(@Param('cat') category: string) {
    return await this.productsService.findByCategory(category);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: PartialUpdateProductDto,
  ) {
    return await this.productsService.update(id, product);
  }

  @Put(':id')
  async replaceProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    return await this.productsService.replace(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.remove(id);
  }

  @Patch(':id/toggle')
  async toggleProductStatus(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.toggleActive(id);
  }
}
