import { Injectable } from '@nestjs/common';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
    @InjectModel("todo") private readonly model:
    Model<TodoDocument>){}
    

    async findAll() : Promise<Todo[]>{
        return  this.model.find().exec();
    }

    async findOne(id: string) : Promise<Todo>{
        return this.model.findById(id).exec();
    }

    async create(createTodoDto : CreateTodoDto): Promise<Todo>{
        return new this.model ({
            ...createTodoDto,
            createdAt: new Date(),
        }).save();
    }

    async update (id: string, updateTodoDto : UpdateTodoDto):
    Promise<Todo>{
        return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
    }

    async delete (id : string ) : Promise<Todo>{
        return await this.model.findByIdAndDelete(id).exec();
    }


    

    
}
