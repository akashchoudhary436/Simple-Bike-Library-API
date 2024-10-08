import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../entities/bike.entity'; 
import { CreateBikeDto } from '../dto/create-bike.dto'; 
import { UpdateBikeDto } from '../dto/update-bike.dto'; 

@Injectable()
export class BikesService {
    constructor(
        @InjectRepository(Bike)
        private bikesRepository: Repository<Bike>,
    ) {}

    // Fetches all bikes from the database.
    async findAll(): Promise<Bike[]> {
        try {
            return await this.bikesRepository.find();
        } catch (error) {
           
            throw new InternalServerErrorException('Error fetching bikes from the database');
        }
    }

    // Creates a new bike entity using data from the CreateBikeDto and saves it to the database.
    async create(createBikeDto: CreateBikeDto): Promise<Bike> {
        try {
            const bike = this.bikesRepository.create(createBikeDto); 
            return await this.bikesRepository.save(bike); // Saves the bike in the database
        } catch (error) {
        
            throw new InternalServerErrorException('Error creating bike in the database');
        }
    }

    // Updates a bike by its ID with new data from UpdateBikeDto.
    async update(id: string, updateBikeDto: UpdateBikeDto): Promise<Bike> {
        const bike = await this.bikesRepository.findOne({ where: { id } });
        if (!bike) {
         
            throw new NotFoundException('Bike not found');
        }

        try {
            Object.assign(bike, updateBikeDto); // Merges new data into the existing bike entity
            return await this.bikesRepository.save(bike); // Saves the updated entity in the database
        } catch (error) {
          
            throw new InternalServerErrorException('Error updating bike in the database');
        }
    }

    // Deletes a bike by its ID from the database.
    async remove(id: string): Promise<void> {
        const bike = await this.bikesRepository.findOne({ where: { id } });
        if (!bike) {
         
            throw new NotFoundException('Bike not found');
        }

        try {
            await this.bikesRepository.remove(bike); // Deletes the bike entity from the database
        } catch (error) {
          
            throw new InternalServerErrorException('Error deleting bike from the database');
        }
    }
}
