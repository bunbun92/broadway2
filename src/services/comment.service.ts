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

  // 모든 댓글 불러오기
  async getAllComments() {
    return this.commentRepository.find();
  }

  // 해당 리뷰에 작성된 댓글 불러오기 + currentUserId 함께 보내주기
  async getCommentByReviewId(reviewId: number, currentUserId: number) {
    const data = await this.commentRepository.find({
      where: { deletedAt: null, reviewId },
      relations: ['user'],
    });
    return { data, currentUserId };
  }

  // 해당 댓글 불러오기
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
