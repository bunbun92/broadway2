import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly CommentService: CommentService,
    private jwtService: JwtService
  ) {}

  // 조건에 따라 댓글 불러오기
  @Get('/get/:reviewId')
  async getAllComments(@Query('reviewId') reviewId, @Req() req: Request) {
    const jwt = req.cookies.jwt;

    // 비로그인 시, 댓글 수정/삭제 버튼 보이지 않음
    if (!jwt) {
      const currentUserId = null;

      // 현재 로그인된 userId와 해당 댓글을 작성한 userId를 비교하기 위해 currentUserId 할당
      if (reviewId) {
        return await this.CommentService.getCommentByReviewId(
          reviewId,
          currentUserId
        );
      } else {
        return await this.CommentService.getAllComments();
      }
    } else {
      const currentUserId = this.jwtService.verify(jwt)['id'];

      if (reviewId) {
        return await this.CommentService.getCommentByReviewId(
          reviewId,
          currentUserId
        );
      } else {
        return await this.CommentService.getAllComments();
      }
    }
  }

  // 해당 댓글 불러오기
  @Get('/:id')
  async getComments(@Param('id') id: number) {
    return this.CommentService.getComments(id);
  }

  @Post('/create/:reviewId')
  async createComments(@Body() data: CreateCommentDto, @Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];

    return await this.CommentService.createComment(
      userId,
      data.reviewId,
      data.comment
    );
  }

  @Put('/update/:id')
  async updateComment(@Param('id') id: number, @Body() data: UpdateCommentDto) {
    return await this.CommentService.updateComment(id, data.comment);
  }

  @Delete('/delete/:id')
  deleteComment(@Param('id') commentId: number) {
    return this.CommentService.deleteComment(commentId);
  }
}
