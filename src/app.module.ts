import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikesModule } from './bike/bikes.module'; 

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'bike-library.db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'], 
            synchronize: true, 
        }),
        BikesModule, 
    ],
})
export class AppModule {}
