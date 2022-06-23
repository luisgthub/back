/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService {
    constructor(
        protected readonly repository:Repository<any> 
    ) {}


    async all(relations=[]):Promise<any[]>{
        return await this.repository.find({relations});
    }

    async paginate(page:number = 1,relations=[]):Promise<{data: any[], meta: {total:number,page:number,last_page:number}}> {
        const take = 10;
        const [data,total] = await this.repository.findAndCount({
            take,
            skip:(page - 1) * take,
            relations
        });
        return {
            data:data,
            meta:{total,
                page,
                last_page:Math.ceil(total / take)
            
            }
        }
    }

    
    async create(data):Promise<any> {
        return this.repository.save(data)
    }

    async findOne(condition,relations=[]):Promise<any>{
        return this.repository.findOne(condition,{relations});
    }

    async update(id:number,data): Promise<any> {
        return this.repository.update(id,data)
    }


    async delete(id:number): Promise<any> {
        return this.repository.delete(id)
    }



}
