import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContextIdFactory } from '@nestjs/core';
import { CreateCommentDto } from 'src/dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {}

  async getAllComments() {
    return this.commentRepository.find();
  }

  async getComments(reviewId: number) {
    return await this.commentRepository.find({
      where: { reviewId, deletedAt: null },
    });
  }

  createComment(data: CreateCommentDto) {
    this.commentRepository.insert(data);
  }

  async updateComment(id, data) {
    return await this.commentRepository.update(id, data);
  }

  deleteComment(id: number) {
    this.commentRepository.softDelete({
      id,
    });
  }
}
