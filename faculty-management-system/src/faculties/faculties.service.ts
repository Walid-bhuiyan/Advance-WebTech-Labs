
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculties } from './entities/faculties.entity.js';
import { CreateFacultyDto } from './dtos/create-faculty.dto.js';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculties)
    private readonly facultyRepo: Repository<Faculties>,
  ) {}

  async createFaculty(faculty: CreateFacultyDto): Promise<Faculties> {
    const facultyEntity = this.facultyRepo.create(faculty);

    return await this.facultyRepo.save(facultyEntity);
  }
}
