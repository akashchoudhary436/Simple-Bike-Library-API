import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { BikesService } from '../services/bikes.service';
import { CreateBikeDto } from '../dto/create-bike.dto';
import { UpdateBikeDto } from '../dto/update-bike.dto';
import { Bike } from '../entities/bike.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('bikes') 
@Controller('bikes')
export class BikesController {
    constructor(private readonly bikesService: BikesService) {}

    // Fetches all bikes from the service
    @Get()
    @ApiResponse({ status: 200, description: 'Return all bikes.' })
    async findAll(): Promise<Bike[]> {
        try {
            return await this.bikesService.findAll();
        } catch (error) {
            
            throw new HttpException('Error fetching bikes', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Creates a new bike using data passed in the request body.
    @Post()
    @ApiResponse({ status: 201, description: 'Bike created.' })
    async create(@Body() createBikeDto: CreateBikeDto): Promise<Bike> {
        try {
            return await this.bikesService.create(createBikeDto);
        } catch (error) {
            // Returns a 400 Bad Request if creation fails
            throw new HttpException('Error creating bike', HttpStatus.BAD_REQUEST);
        }
    }

    // Updates an existing bike's details using its ID and data from the request body.
    @Put(':id')
    @ApiResponse({ status: 200, description: 'Bike updated.' })
    async update(@Param('id') id: string, @Body() updateBikeDto: UpdateBikeDto): Promise<Bike> {
        try {
            return await this.bikesService.update(id, updateBikeDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
              
                throw new HttpException('Bike not found', HttpStatus.NOT_FOUND);
            }
           
            throw new HttpException('Error updating bike', HttpStatus.BAD_REQUEST);
        }
    }

    // Deletes a bike by its ID
    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Bike deleted.' })
    async remove(@Param('id') id: string): Promise<void> {
        try {
            await this.bikesService.remove(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
            
                throw new HttpException('Bike not found', HttpStatus.NOT_FOUND);
            }
           
            throw new HttpException('Error deleting bike', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
