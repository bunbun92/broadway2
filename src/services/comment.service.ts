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

  async getCommentByReviewId(reviewId) {
    return this.commentRepository.find({
      where: { deletedAt: null, reviewId },
      relations: ['user'],
    });
  }

  async getComments(id: number) {
    return await this.commentRepository.findOne({
      where: { id, deletedAt: null },
    });
  }

  createComment(userId: number, reviewId: number, comment: string) {
    this.commentRepository.insert({ userId, reviewId, comment });
  }

  async updateComment(id: number, comment: string) {
    return await this.commentRepository.update({ id }, { comment });
  }

  deleteComment(id: number) {
    this.commentRepository.softDelete({
      id,
    });
  }
}
